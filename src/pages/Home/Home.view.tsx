import * as React from 'react'
import { Link } from 'react-router-dom'
import { Header } from 'app/App.components/Header/Header.controller'
import { MainFooter } from 'app/App.components/MainFooter/MainFooter.controller'
import { Button } from 'app/App.components/Button/Button.controller'

//prettier-ignore
import { HomeContainer, HomePage, HomeStyled } from './Home.style'


export const HomeView = () => {
  return (
    <HomeStyled>
      <Header />
      <HomePage>
        <HomeContainer>
          <section className={'main'}>
            <div className={'left'}>
              <h1 className={'title'}>
                <div className={'title_sub'}>Lorem ipsum</div>
                <div className={'title_bg'}>dolor sit amet</div>
                <div className={'title_sub'}>consectetur adipiscing elit</div>
              </h1>
              <p className={'text'}>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
              <p className={'text'}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>

              <Link className={'get-started'} to="/web3/chapter-1">
                <Button text="Start Learning" color="primary"/>
              </Link>
            </div>
            <div className={'right'} />
          </section>
          <div className={'wrapp_card'}>
            <div className={'box-inner'}>
              <div className={'card_items'}>
                <div className={'card_item item_1'}>
                  <div className={'card_title'}>
                    Duis aute irure dolor in reprehenderit
                  </div>
                </div>
                <div className={'card_item item_2'}>
                  <div className={'card_item-title'}>
                    <div className={'box-img'}>
                      <img src="icons/nft_certificates.svg" alt="" width="32px" height="28px" />
                    </div>
                    <div className={'title'}>
                      dolore eu
                    </div>
                  </div>
                  <div className={'card_item-text'}>
                    in voluptate velit esse cillum
                  </div>
                </div>
                <div className={'card_item item_3'}>
                  <div className={'card_item-title'}>
                    <div className={'box-img'}>
                      <img src="icons/learn2earn.svg" alt="" width="34px" height="33px" />
                    </div>
                    <div className={'title'}>
                        Excepteur sint
                    </div>
                  </div>
                  <div className={'card_item-text'}>
                    cupidatat non proident, sunt in culpa
                  </div>
                </div>
                <div className={'card_item item_4'}>
                  <div className={'card_item-title'}>
                    <div className={'box-img'}>
                      <img src="icons/contribute2earn.svg" alt="" width="37px" height="34px" />
                    </div>
                    <div className={'title'}>
                      id est laborum
                    </div>
                  </div>
                  <div className={'card_item-text'}>
                    qui officia deserunt mollit anim
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HomeContainer>
      </HomePage>
      <MainFooter />
    </HomeStyled>
  )
}
