/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from '!raw-loader!./course.md'
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import { Data } from 'pages/Chapter/Chapter.controller'

export const data: Data = { course: course, exercise: undefined, solution: undefined, supports: { }, questions: [] }
