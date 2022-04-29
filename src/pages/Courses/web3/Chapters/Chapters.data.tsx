import { ChapterData } from 'pages/Chapter/Chapter.controller'

import { course } from '..'
import { data as chapter1 } from './Chapter-1'

export const chapterData: ChapterData[] = [
  {
    pathname: `/${course.path}/chapter-1`,
    name: 'Reading Data from the Network',
    data: chapter1,
  },{
    pathname: `/${course.path}/chapter-2`,
    name: 'Writing Data to the Network',
    data: chapter1,
  },{
    pathname: `/${course.path}/chapter-3`,
    name: 'Interacting with Wallets',
    data: chapter1,
  },{
    pathname: `/${course.path}/chapter-4`,
    name: 'Serializing Custom Instructions',
    data: chapter1,
  },{
    pathname: `/${course.path}/chapter-5`,
    name: 'Deserializing Custom Accounts',
    data: chapter1,
  },{
    pathname: `/${course.path}/chapter-6`,
    name: 'Paginating, Ordering, and Filtering',
    data: chapter1,
  },

]
