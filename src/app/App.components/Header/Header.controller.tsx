import * as React from 'react'
import * as PropTypes from 'prop-types'

import {HeaderView} from './Header.view'

interface IHeader {
  inChapter?: boolean,
}

export const Header = ({ inChapter }: IHeader) => {
  return <HeaderView
    inChapter={inChapter}
  />
}

Header.propTypes = {
  inChapter: PropTypes.bool,
};
