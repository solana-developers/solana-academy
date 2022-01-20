import * as React from 'react'
import {Link} from 'react-router-dom'
import classnames from 'classnames'

import {HamburgerLeft} from '../Hamburger/Hamburger.controller'
// prettier-ignore
import {HeaderFull, HeaderLogo, HeaderStyled, LeftContainer} from "./Header.style";
import {Button} from "../Button/Button.controller";

type HeaderViewProps = {
    inChapter?: boolean,
}

// Overall Navbar
export const HeaderView = ({inChapter}: HeaderViewProps) => {
    return (
        <HeaderStyled className={classnames(
                inChapter && 'inChapter'
            )}>
            <LeftContainer>
                <HamburgerLeft/>
                <Link to="/">
                    <HeaderLogo alt="logo" width="179px" src="/images/header/logo.svg"/>
                </Link>
            </LeftContainer>
            <HeaderFull>
                <div className={
                    classnames(
                        'nav-wrapp',
                        inChapter && 'inChapter'
                    )}>
                    <Link className={'get-started'} to="/solana101/chapter-1">
                        <Button text="Start learning" color="primary"/>
                    </Link>
                </div>
            </HeaderFull>
        </HeaderStyled>
    )
}

HeaderView.defaultProps = {}
