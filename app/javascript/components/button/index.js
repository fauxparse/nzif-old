import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { applyStyleModifiers } from 'styled-components-modifiers'
import MODIFIERS from './modifiers'
import Text from './text'
import Icon from './icon'
import Ripple from '../shared/ripple'
import identity from 'lodash/identity'

const StyledButton = styled.button`
  align-items: center;
  appearance: none;
  background: none;
  border: 1px solid currentColor;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  display: flex;
  font: inherit;
  margin: 0;
  outline: none;
  padding: calc(0.5em - 1px);
  position: relative;
  transition: ${({ theme }) => theme.transition()};

  &:focus {
    box-shadow: 0 0 0 .25em ${({ theme }) => theme.colors.outline};
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    touch-action: none;
  }

  + & {
    margin-left: .5em;
  }

  ${Text} {
    padding: 0 .5em;
  }

  ${applyStyleModifiers(MODIFIERS)}
`

const Button = React.forwardRef(({ text, icon, children, primary, ...props }, ref) => {
  const modifiers = [primary && 'primary', icon && !text && 'icon'].filter(identity)

  return (
    <Ripple {...props} as={StyledButton} ref={ref} modifiers={modifiers}>
      {children}
      {icon && <Icon name={icon} />}
      {text && <Text>{text}</Text>}
    </Ripple>
  )
})

Button.propTypes = {
  primary: PropTypes.bool,
}

Button.defaultProps = {
  primary: false,
}

Button.Text = Text
Button.Icon = Icon
Button.MODIFIERS = MODIFIERS

export default Button
