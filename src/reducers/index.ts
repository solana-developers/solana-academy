import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
// Drawers
import { loginDrawer, LoginDrawerState } from './loginDrawer'
import { chapterDrawer, ChapterDrawerState } from './chapterDrawer'

import { gdpr, GdprState } from './gdpr'
import { loading, LoadingState } from './loading'
import { progressBar, ProgressBarState } from './progressBar'
import { serviceWorker, ServiceWorkerState } from './serviceWorker'
import { progressChapter, ProgressChapterState } from './progressChapter'
import { toaster, ToasterState } from './toaster'

export const reducers = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    loading,
    toaster,
    chapterDrawer,
    loginDrawer,
    progressBar,
    progressChapter,
    serviceWorker,
    gdpr,
  })

export interface State {
  loading: LoadingState
  toaster: ToasterState
  loginDrawer: LoginDrawerState
  chapterDrawer: ChapterDrawerState
  progressBar: ProgressBarState
  progressChapter: ProgressChapterState
  serviceWorker: ServiceWorkerState
  gdpr: GdprState
}
