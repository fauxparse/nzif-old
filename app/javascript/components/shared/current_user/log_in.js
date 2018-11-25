import React from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'
import { transition } from '../../../styles'
import { Link } from '../ripple'

const LogIn = styled(Link).attrs({
  to: '/login',
  children: 'Log in',
})`
  background: ${({ theme }) => chroma(theme.colors.hoverBackground).alpha(0)};
  color: inherit;
  margin-right: -1em;
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
