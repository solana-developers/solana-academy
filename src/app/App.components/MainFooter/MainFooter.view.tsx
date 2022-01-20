import React from 'react';
import * as PropTypes from "prop-types";

import {Footer} from './MainFooter.style'

type FooterViewProps = {
    mobileFooter?: boolean | undefined;
}

export const ViewMainFooter  = ({mobileFooter}: FooterViewProps) => {
    return (
      <Footer>
        <div className={mobileFooter ? 'mobileFooterWrapp' : 'footer-wrapper'}>
          <div className={'social-box'}>
            <div className={'social-items'}>
              <ul>
                <li className={'nav-item'}>
                  <a href={'https://github.com/solana-dev-adv/solana-academy'}>
                    <img src={'/images/main_footer/github.png'} alt="github icon" />
                  </a>
                </li>
                <li className={'nav-item'}>
                  <a href={'https://twitter.com/Solana'}>
                    <img src={'/images/main_footer/twitter.png'} alt="twitter icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </Footer>
  )
}

ViewMainFooter.propTypes = {
  user: PropTypes.object,
}

ViewMainFooter.defaultProps = {}
