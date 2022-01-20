import { ChapterData } from 'pages/Chapter/Chapter.controller'

import { course } from '..'
import { data as chapter1 } from './Chapter-1'

export const chapterData: ChapterData[] = [
  {
    pathname: `/${course.path}/chapter-1`,
    name: 'Sending Your First Transaction',
    data: chapter1,
  }
]
