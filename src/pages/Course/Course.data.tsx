import { course as web3 } from '../Courses/web3'
import { chapterData as web3Chapters } from '../Courses/web3/Chapters/Chapters.data'
import { CourseData } from './Course.controller'

export const courseData: CourseData[] = [
  {
    path: web3.path,
    pathname: `/${web3.path}/info`,
    name: 'Solana 101',
    data: web3,
  },
]

// chaptersByCourse: Used to render chapter data of each course.
// the key in chaptersByCourse == the path in courseData
type ChapterDataDictionary = {
  [key: string]: any
}

export const chaptersByCourse: ChapterDataDictionary = {
  web3: web3Chapters,
}
