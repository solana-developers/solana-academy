import * as React from 'react'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { App } from './app/App.controller'
import { configureStore } from './app/App.store'
import { unregister } from './serviceWorker'
import { GlobalStyle } from './styles'
// @ts-ignore
import TagManager from 'react-gtm-module'

import './styles/fonts.css'

export const store = configureStore({})

ReactGA.initialize('UA-192160338-1')

const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID
}
TagManager.initialize(tagManagerArgs);


export const Root = () => {
  return (
    <div>
      <GlobalStyle />
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </div>
  )
}

unregister()
