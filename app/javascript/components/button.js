import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Ripple from './ripple'

export const ButtonText = styled.div``

const StyledButton = styled.button`
  align-items: center;
  appearance: none;
  background: ${props => props.primary ? props.theme.colors.accent : 'none'};
  border: ${props => props.primary ? 'none' : `1px solid ${props.theme.colors.accent}`};
  border-radius: ${props => props.theme.layout.borderRadius};
  color: ${props => props.primary ? props.theme.colors.white : props.theme.colors.accent};
  cursor: pointer;
  display: flex;
  font: inherit;
  margin: 0;
  outline: none;
  padding: 0;
  position: relative;
  transition: ${props => props.theme.transition('box-shadow')};

  &:focus {
    box-shadow: 0 0 0 .25em ${props => props.theme.colors.outline};
  }

  + & {
    margin-left: .5em;
  }

  ${Ripple} {
    padding: calc(0.5em - ${props => props.primary ? '0px' : '1px'});
  }

  ${ButtonText} {
    padding: 0 .5em;
  }
`

class Button extends React.PureComponent {
  render() {
    const { children, ...props } = this.props

    return (
      <StyledButton {...props}>
        <Ripple>
          {children}
        </Ripple>
      </StyledButton>
    )
  }
}

Button.propTypes = {
  primary: PropTypes.bool.isRequired,
}

Button.defaultProps = {
  primary: false,
}

export default Button
