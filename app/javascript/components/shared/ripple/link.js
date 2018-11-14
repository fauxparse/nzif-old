import React from 'react'
import styled from 'styled-components'
import Ripple from './container'
import Link from '../link'

const RippledLink = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  padding: 0 1rem;
  text-decoration: none;
`

export default styled(({ children, ...props }) => (
  <Ripple as={RippledLink} {...props}>
    {children}
  </Ripple>
))``
