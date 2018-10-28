import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import Ripple from './ripple'

const ButtonRipple = styled(Ripple)``

export const ButtonText = styled.div``

const StyledButton = styled.button`
  align-items: center;
  appearance: none;
  background: ${props => props.theme.colors.background};
  border: ${props => props.primary ? 'none' : '1px solid currentColor'};
  border-radius: ${props => props.theme.layout.borderRadius};
  color: ${props => props.theme.colors.text};
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

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    touch-action: none;
  }

  + & {
    margin-left: .5em;
  }

  ${ButtonRipple} {
    padding: calc(0.5em - ${props => props.primary ? '0px' : '1px'});
  }

  ${ButtonText} {
    padding: 0 .5em;
  }
`

class Button extends React.PureComponent {
  theme = (theme) => {
    if (this.props.primary) {
      return {
        ...theme,
        colors: {
          ...theme.colors,
          background: theme.colors.accent,
          text: 'white',
        }
      }
    } else {
      return {
        ...theme,
        colors: {
          ...theme.colors,
          background: 'none',
          text: theme.colors.accent,
        }
      }
    }
  }

  render() {
    const { children, ...props } = this.props

    return (
      <ThemeProvider theme={this.theme}>
        <StyledButton {...props}>
          <ButtonRipple color={props.primary ? 'white' : undefined}>
            {children}
          </ButtonRipple>
        </StyledButton>
      </ThemeProvider>
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
