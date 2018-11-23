import React from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'
import Ripple from '../ripple'
import Icon from '../../icons'

const Chevron = styled(Icon).attrs({ name: 'chevron-down' })`
  flex: 0 0 auto;
  margin-left: 0.5em;
`

const StyledButton = styled(Ripple).attrs(({ open }) => ({
  role: 'button',
  'aria-expanded': open,
}))`
  align-items: center;
  background-color: ${({ theme }) => chroma(theme.colors.hoverBackground).alpha(0).css()};
  cursor: pointer;
  display: flex;
  padding: 0.5em 1em;
  transition: ${({ theme }) => theme.transition('background-color')};

  :hover,
  :focus,
  :active {
    background: ${({ theme }) => theme.colors.hoverBackground};
  }

  > ${Chevron} {
    transition: ${({ theme }) => theme.transition('transform')};
    transform: rotate(${({ open }) => open * 180}deg);
  }
`

const Button = React.forwardRef(({ children, open, ...props }, ref) => (
  <StyledButton ref={ref} open={open} {...props}>
    {children}
    <Chevron />
  </StyledButton>
))

Button.Chevron = Chevron
Button.Styled = StyledButton

export default Button
