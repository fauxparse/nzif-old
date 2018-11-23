import React from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'
import { Link } from '../ripple'

const LogIn = styled(Link).attrs({
  to: '/login',
  children: 'Log in',
})`
  background: ${({ theme }) => chroma(theme.colors.hoverBackground).alpha(0)};
  color: inherit;
  margin-right: -1em;
  order: 1;
  transition: ${({ theme }) => `${theme.transition('background-color')}, ${theme.transition('opacity')}`};

  :hover,
  :focus,
  :active {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
    outline: none;
  }
`

export default LogIn
