import * as React from 'react'
import {useEffect, useState} from 'react'

import {useLocation} from 'react-router-dom'

import {CourseData} from '../Course/Course.controller'

import {chaptersByCourse, courseData} from '../Course/Course.data'
import {chapterData} from '../Courses/web3/Chapters/Chapters.data'

import {PENDING, RIGHT, WRONG} from './Chapter.constants'

import {ChapterView} from './Chapter.view'

export interface ChapterData {
  pathname: string
  name: string
  data: Data
}

export type Question = {
  question: string
  selectedText?: string
  answers: string[]
  responses: string[]
  proposedResponses?: string[]
}

export interface Data {
  course: string | undefined
  exercise: string | undefined
  solution: string | undefined
  supports: Record<string, string | undefined>
  questions: Question[]
}

export const Chapter = () => {
  const [validatorState, setValidatorState] = useState(PENDING)
  const [showDiff, setShowDiff] = useState(false)
  const { pathname } = useLocation()
  const [data, setData] = useState<Data>({
    course: undefined,
    exercise: undefined,
    solution: undefined,
    supports: {},
    questions: [],
  })
  let previousChapter = '/'
  let nextChapter = '/'
  let percent = 0

  useEffect(() => {
    courseData.forEach((course: CourseData) => {
      const index = course.path!

      chaptersByCourse[index].forEach((chapter: ChapterData) => {
        if (pathname === chapter.pathname)
          setData({
            course: chapter.data.course,
            exercise: chapter.data.exercise,
            solution: chapter.data.solution,
            supports: chapter.data.supports,
            questions: chapter.data.questions.map((question) => {
              return { ...question, proposedResponses: [] }
            }),
          })
      })
    })
  }, [pathname])


  chapterData.forEach((chapter, i) => {
    if (pathname === chapter.pathname) {
      if (i - 1 >= 0) previousChapter = chapterData[i - 1].pathname
      percent = 0
      if (i + 1 < chapterData.length) {
        nextChapter = chapterData[i + 1].pathname
      } else {
        nextChapter = '/finished'
      }
      if (i !== 7) percent = ((i + 1) / chapterData.length) * 100
      else percent = 100
    }
  })

  const validateCallback = () => {
    if (pathname === '/web3/chapter-8') {
      setValidatorState(RIGHT)
      return
    }

    if (data.questions.length > 0) {
      let ok = true
      data.questions.forEach((question) => {
        if (!question.proposedResponses) ok = false
        else {
          question.responses.forEach((response) => {
            if (!(question.proposedResponses && question.proposedResponses.indexOf(response) >= 0)) ok = false
          })
          question.proposedResponses.forEach((proposedResponse) => {
            if (!(question.responses.indexOf(proposedResponse) >= 0)) ok = false
          })
        }
        if (question.responses.length === 0) ok = true
      })
      if (ok) {
        setValidatorState(RIGHT)
      } else {
        if (showDiff) {
          const [propsQuestions] = data.questions;

          setData({
            ...data,
            questions: [{...propsQuestions, proposedResponses: []}],
          })
          setShowDiff(false)
          setValidatorState(PENDING)
        } else {
          setShowDiff(true)
          setValidatorState(WRONG)
        }
      }
    } else {
      if (showDiff) {
        setShowDiff(false)
        setValidatorState(PENDING)
      } else {
        setShowDiff(true)
        if (data.exercise && data.solution) {
          if (
            // @ts-ignore
            data.exercise.replace(/\s+|\/\/ Type your solution below/g, '') ===
            // @ts-ignore
            data.solution.replace(/\s+|\/\/ Type your solution below/g, '')
          ) {
            setValidatorState(RIGHT)
          } else if (pathname === '/web3/chapter-3' && data.exercise.match(/^[a-z0-9_-]*.testnet/gm)) {
            setShowDiff(false)
            setValidatorState(RIGHT)
          } else setValidatorState(WRONG)
        } else setValidatorState(WRONG)
      }
    }
  }

  const proposedSolutionCallback = (e: string) => {
    // @ts-ignore
    setData({ ...data, exercise: e })
  }

  const proposedQuestionAnswerCallback = (e: Question[]) => {
    // @ts-ignore
    setData({ ...data, questions: e })
  }

  return (
    <>
      {data.course && (
          <ChapterView
            validatorState={validatorState}
            validateCallback={validateCallback}
            solution={data.solution}
            proposedSolution={data.exercise}
            proposedSolutionCallback={proposedSolutionCallback}
            course={data.course}
            showDiff={showDiff}
            supports={data.supports}
            questions={data.questions}
            nextChapter={nextChapter}
            previousChapter={previousChapter}
            proposedQuestionAnswerCallback={proposedQuestionAnswerCallback}
            percent={percent}
          />
        )}
    </>
  )
}
