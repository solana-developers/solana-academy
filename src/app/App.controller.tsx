import * as React from 'react'

import {ConnectedRouter} from 'connected-react-router'

import {ChapterDrawer} from './App.components/Drawer/Drawer.controller'
import {ProgressBar} from './App.components/ProgressBar/ProgressBar.controller'
import {Toaster} from './App.components/Toaster/Toaster.controller'
import {history} from './App.store'
import {AppBg} from './App.style'
import {AppView} from './App.view'

export const App = () => {

  return (
    <ConnectedRouter history={history}>
      <AppBg>
        <ChapterDrawer />
        <AppView />
        <Toaster />
        <ProgressBar />
      </AppBg>
    </ConnectedRouter>
  )
}
