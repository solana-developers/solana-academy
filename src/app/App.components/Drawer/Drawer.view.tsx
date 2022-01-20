import * as PropTypes from 'prop-types'
import * as React from 'react'
import {Link} from 'react-router-dom'
import { ChapterData } from '../../../pages/Chapter/Chapter.controller'
import { chaptersByCourse } from '../../../pages/Course/Course.data'
import {MainFooter} from '../MainFooter/MainFooter.controller'
import classnames from 'classnames'
import {Option} from '../Select/Select.view'
import {DrawerItem, DrawerMask, DrawerStyled} from './Drawer.style'
import { useSelector } from 'react-redux'
import { State } from 'reducers'

type ChapterDrawerViewProps = {
  showingChapters: boolean
  hideCallback: () => void
  pathname: string
  changeCourseCallback: (e: Option) => void
  activeCourse: Option,
}

export const ChapterDrawerView = ({
  showingChapters,
  pathname,
  activeCourse,
  hideCallback,
}: ChapterDrawerViewProps) => {
  const progressUserChapter = useSelector((state: State) => state.progressChapter.progressUserChapter)
  return (
    <>
      <DrawerMask className={`${showingChapters}`} onClick={() => hideCallback()} />
      <DrawerStyled className={`${showingChapters}`}>
        <div className={'top'}>
          <div className={'arrow-box'} onClick={() => hideCallback()}>
            <img src="/images/sideMenu/arrow.svg" alt="" />
          </div>
          <div className={'name-box'} />
        </div>
        <div className={'title-box'}>
          <h1 className={'title'}>Chapters</h1>
        </div>


        <div className={classnames('isAuth')}>
          {chaptersByCourse[activeCourse.path].map((chapter: ChapterData, key: number) => {
            let done = progressUserChapter.indexOf(chapter.pathname) >= 0

            return (
                <DrawerItem key={chapter.pathname} className={pathname === chapter.pathname ? 'current-path' : 'other-path'}>
                  <Link className={classnames(done && 'checked')} to={chapter.pathname} onClick={() => hideCallback()}>
                    <span className={'number'}>{key + 1}</span>
                    <span className={'name-link'}>{chapter.name}</span>
                  </Link>
                </DrawerItem>
            )
          })}
        </div>
        <MainFooter mobileFooter hideCallback={hideCallback}/>
      </DrawerStyled>
    </>
  )
}


ChapterDrawerView.propTypes = {
  showingChapter: PropTypes.bool,
  hideCallback: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  changeCourseCallback: PropTypes.func.isRequired,
  activeCourse: PropTypes.object.isRequired,
}

ChapterDrawerView.defaultProps = {
  showingChapter: false,
}