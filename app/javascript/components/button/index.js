import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { applyStyleModifiers } from 'styled-components-modifiers'
import { transition } from '../../styles'
import Ripple from '../shared/ripple'
import MODIFIERS from './modifiers'
import Text from './text'
import Icon from './icon'
import identity from 'lodash/identity'

export const StyledButton = styled.button`${({ theme }) => css`
  align-items: center;
  appearance: none;
  background: none;
  border: 1px solid currentColor;
  border-radius: ${theme.layout.borderRadius};
  box-shadow: 0 0 0 0 ${theme.colors.outline.alpha(0)};
  color: ${theme.colors.accent};
  cursor: pointer;
  display: flex;
  font: inherit;
  margin: 0;
  outline: none;
  padding: calc(0.5em - 1px);
  position: relative;
  transition: ${transition('all')};

  &:focus {
    box-shadow: 0 0 0 .25em ${theme.colors.outline};
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
`}`

const Button = forwardRef(({ as = StyledButton, text, icon, children, primary, ...props }, ref) => {
  const modifiers = [primary && 'primary', icon && !text && 'icon'].filter(identity)

  return (
    <Ripple {...props} as={as} ref={ref} modifiers={modifiers}>
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
