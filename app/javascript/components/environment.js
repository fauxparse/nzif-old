import React from 'react'
import styled from 'styled-components'
import Icon from './icons'

const Corner = styled.div`
  position: fixed;
  top: -1em;
  left: -1em;
  width: 6.5em;
  height: 6.5em;
  padding: 1.5em;
  background: ${({ theme }) => `linear-gradient(
    to right bottom,
    ${theme.colors.palette.plum[500]} 10%,
    ${theme.colors.palette.grape[500]} 50%,
    rgba(0, 0, 0, 0.15) 50%,
    rgba(0, 0, 0, 0) 55%
  )`};
  color: white;
  pointer-events: none;
  touch-action: none;
  z-index: 1000;

  ${Icon} {
    display: block;
  }

  @media (max-width: 24em) {
    display: none;
  }
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
