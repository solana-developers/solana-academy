import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HamburgerViewLeft } from './Hamburger.view'
import { showChapterDrawer, hideChapterDrawer } from '../Drawer/Drawer.actions'
import { State } from 'reducers'

export const HamburgerLeft = () => {
  const dispatch = useDispatch()
  const activated = useSelector((state: State) => state.chapterDrawer.showingChapter)

  const activateCallback = () => {
    dispatch(activated ? hideChapterDrawer() : showChapterDrawer())
  }

  useEffect(() => {
    if (activated) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [activated])

  return <HamburgerViewLeft activated={activated} activateCallback={activateCallback} />
}

