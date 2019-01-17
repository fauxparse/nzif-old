import React from 'react'
import styled from 'styled-components'
import { transition } from '../../../styles'
import { Link } from '../ripple'

const LogIn = styled(Link).attrs({
  to: '/login',
  children: 'Log in',
})`
  background: ${({ theme }) => theme.colors.hoverBackground};
  color: inherit;
  order: 1;
  transition: ${transition('background-color')};

  :hover,
  :focus,
  :active {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
    outline: none;
  }
`

export default LogIn
