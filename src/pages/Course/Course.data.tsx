import { course as solana101 } from '../Courses/solana101'
import { chapterData as solana101Chapters } from '../Courses/solana101/Chapters/Chapters.data'
import { CourseData } from './Course.controller'

export const courseData: CourseData[] = [
  {
    path: solana101.path,
    pathname: `/${solana101.path}/info`,
    name: 'Solana 101',
    data: solana101,
  },
]

// chaptersByCourse: Used to render chapter data of each course.
// the key in chaptersByCourse == the path in courseData
type ChapterDataDictionary = {
  [key: string]: any
}

export const chaptersByCourse: ChapterDataDictionary = {
  solana101: solana101Chapters,
}
