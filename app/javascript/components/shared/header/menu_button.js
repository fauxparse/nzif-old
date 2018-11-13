import React from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'
import classNames from 'classnames'
import Button from '../../button'
import Icon from '../../icons'
import { DURATION } from '../../../themes/transition'

const MenuButton = styled(Button)`
  appearance: none;
  background: ${({ theme }) => chroma(theme.colors.text).alpha(0).css()};
  border: none;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  padding: 0.5em;
  transition: ${({ theme }) => theme.transition()};

  &:hover,
  &:focus {
    background: ${props => chroma(props.theme.colors.text).alpha(0.15).css()};
    box-shadow: none;
    outline: none;
  }

  g, line {
    transform-origin: 0 0;
    transition: ${({theme}) => theme.transition('transform', DURATION.half)};
    transition-delay: ${DURATION.half}ms;
  }

  &:not([aria-selected="true"]) line {
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

  &[aria-selected="true"] {
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

export default styled(({ open = false, ...props }) => (
  <MenuButton aria-selected={open} {...props}>
    <Icon viewBox="-12 -12 24 24">
      <g><line x1="-9" y1="0" x2="9" y2="0" /></g>
      <g><line x1="-9" y1="0" x2="9" y2="0" /></g>
      <g><line x1="-9" y1="0" x2="9" y2="0" /></g>
    </Icon>
  </MenuButton>
))``