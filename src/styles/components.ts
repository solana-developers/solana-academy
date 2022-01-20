import styled from 'styled-components/macro'

import {fadeInFromLeft} from './animations'
import {backgroundColorLight} from './colors'

export const CardPage = styled.div`
  margin: 100px auto 20px auto;
  width: 400px;
  max-width: 90vw;
`

export const FullPage = styled.div`
  width: 100%;
  max-width: 1534px;
  margin: 0 auto;
`

export const GridTitle = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`

export const Card = styled.div`
  background: ${backgroundColorLight};
  border-radius: 10px;
  box-shadow: 0 1px 10px ${backgroundColorLight}19;
`

export const FadeInFromLeft = styled.div`
  will-change: opacity, transform;
  animation: ${fadeInFromLeft} 500ms;
`
