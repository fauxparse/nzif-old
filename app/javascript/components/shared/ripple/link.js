import React from 'react'
import styled from 'styled-components'
import Ripple from './container'
import Link from '../link'

const StyledLink = styled(Link)`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  padding: 0 1rem;
  text-decoration: none;
`

const RippledLink = ({ children, ...props }) => (
  <Ripple as={StyledLink} {...props}>
    {children}
  </Ripple>
)

export default RippledLink
