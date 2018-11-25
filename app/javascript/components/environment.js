import React from 'react'
import styled from 'styled-components'
import Icon from './icons'
import { media } from '../styles'

const Corner = styled.div`
  display: none;
  position: fixed;
  top: -1em;
  left: -1em;
  width: 6.5em;
  height: 6.5em;
  padding: 1.5em;
  background: ${({ theme }) => `linear-gradient(
    to right bottom,
    ${theme.colors.plum[500]} 10%,
    ${theme.colors.grape[500]} 50%,
    rgba(0, 0, 0, 0.15) 50%,
    rgba(0, 0, 0, 0) 55%
  )`};
  color: white;
  opacity: 0.875;
  pointer-events: none;
  touch-action: none;
  z-index: 1000;

  svg {
    display: block;
  }

  ${media.medium`
    display: block;
  `}
`

const Environment = () => {
  const environmentTag = document.querySelector('meta[name="environment"]')
  const environment = environmentTag && environmentTag.getAttribute('content')

  if (environment === 'development') {
    return (
      <Corner>
        <Icon name="development" />
      </Corner>
    )
  }

  return null
}

export default Environment
