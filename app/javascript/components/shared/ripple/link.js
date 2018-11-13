import React from 'react'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'
import chroma from 'chroma-js'
import Ripple from './container'

const RefForwardingLink = React.forwardRef(({ children, ...props }, ref) => (
  <NavLink {...props} innerRef={ref}>
    {children}
  </NavLink>
))

const RippledLink = styled(RefForwardingLink)`
  align-items: center;
  color: ${props => props.theme.colors.text};
  display: flex;
  justify-content: flex-start;
  padding: 0 1rem;
  text-decoration: none;
  transition: ${props => props.theme.transition('background-color')};
`

export default styled(({ children, ...props }) => (
  <Ripple as={RippledLink} {...props}>
    {children}
  </Ripple>
))``
