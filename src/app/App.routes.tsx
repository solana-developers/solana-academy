/**
 * React Dependency
 * **/

import React from 'react'
import {Route, Switch} from 'react-router-dom'

/**
 * Custom Components
 * **/
import {Chapter} from 'pages/Chapter/Chapter.controller'
import {Course} from 'pages/Course/Course.controller'
import {Error404} from 'pages/Error404/Error404.controller'
import {Home} from 'pages/Home/Home.controller'
export const AppRoutes = ({ location }: any) => (
  <Switch location={location}>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/*/info">
      <Course />
    </Route>
    <Route path="/*/chapter-*">
      <Chapter />
    </Route>
    <Route>
      <Error404 />
    </Route>
  </Switch>
)
