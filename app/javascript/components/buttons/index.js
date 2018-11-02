import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import Ripple from '../shared/ripple'
import ButtonText from './text'
import ButtonIcon from './icon'

const ButtonRipple = styled(Ripple)``

const StyledButton = styled.button`
  appearance: none;
  background: ${props => props.theme.colors.background};
  border: ${props => props.primary ? 'none' : '1px solid currentColor'};
  border-radius: ${props => props.iconOnly ? '50%' : props.theme.layout.borderRadius};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
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
    align-items: center;
    display: flex;
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
    const { text, icon, children, ...props } = this.props

    return (
      <ThemeProvider theme={this.theme}>
        <StyledButton iconOnly={icon && !text} {...props}>
          <ButtonRipple color={props.primary ? 'white' : undefined}>
            {children}
            {icon && <ButtonIcon name={icon} />}
            {text && <ButtonText>{text}</ButtonText>}
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
