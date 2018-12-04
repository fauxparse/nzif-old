import React from 'react'
import styled from 'styled-components'
import transition, { DURATION } from '../../../styles/transition'
import Button from '../../button'
import Icon from '../../icons'

const Hamburger = () => (
  <Icon viewBox="-12 -12 24 24">
    <g><line x1="-9" y1="0" x2="9" y2="0" /></g>
    <g><line x1="-9" y1="0" x2="9" y2="0" /></g>
    <g><line x1="-9" y1="0" x2="9" y2="0" /></g>
  </Icon>
)

const MenuButton = styled(Button).attrs(({ open }) => ({
  'aria-selected': open || undefined,
  children: <Hamburger />,
}))`
  appearance: none;
  background: rgba(0, 0, 0, 0);
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  padding: 0.5em;
  transition: ${transition('all')};

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.375);
    box-shadow: none;
    outline: none;
  }

  g, line {
    transform-origin: 0 0;
    transition: ${transition('transform', { duration: 'half', delay: 'half' })};
  }

  &:not([aria-selected]) line {
    transition-delay: 0ms;
  }

  g:nth-child(1) {
    transform: translate3d(0, -6px, 0);
  }

  g:nth-child(2) line {
    opacity: 1;
    transition: opacity 0s linear ${DURATION.half}ms;
  }

  g:nth-child(3) {
    transform: translate3d(0, 6px, 0);
  }

  &[aria-selected] {
    g {
      transform: translate3d(0, 0, 0);
      transition-delay: 0ms;
    }

    g:nth-child(1) line {
      transform: rotate(45deg);
    }

    g:nth-child(2) line {
      opacity: 0;
    }

    g:nth-child(3) line {
      transform: rotate(-45deg);
    }
  }
`

export default MenuButton
