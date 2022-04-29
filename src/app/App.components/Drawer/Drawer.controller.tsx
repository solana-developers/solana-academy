import * as React from 'react'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {State} from 'reducers'
import {Option} from '../Select/Select.view'

import {hideChapterDrawer} from './Drawer.actions'
import {ChapterDrawerView} from './Drawer.view'

export const ChapterDrawer = () => {
  const dispatch = useDispatch()
  const showingChapter = useSelector((state: State) => state.chapterDrawer && state.chapterDrawer.showingChapter)
  const { pathname } = useLocation()

  let defaultCourse: Option = { name: 'Solana 101', path: 'web3' }
  const [activeCourse, setActiveCourse] = useState(defaultCourse)

  function changeCourseCallback(e: Option) {
    if (e.path === 'web3') {
      setActiveCourse({ name: 'Solana 101', path: 'web3' })
    }
    if (e.path === 'solana102') {
      setActiveCourse({ name: 'Solana 102', path: 'solana102' })
    }
  }

  const hideCallback = () => {
    dispatch(hideChapterDrawer())
  }

  return (
    <ChapterDrawerView
      showingChapters={showingChapter}
      hideCallback={hideCallback}
      pathname={pathname}
      activeCourse={activeCourse}
      changeCourseCallback={changeCourseCallback}
    />
  )
}
