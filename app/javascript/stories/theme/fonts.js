/* eslint-disable react/display-name */

import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import { BASE_SIZE } from '../../themes/fonts'

const FontContainer = styled.div`
  padding: 2em;
`

const StyledRow = styled.div`${({ size, theme }) => css`
  display: flex;
  align-items: baseline;
  margin: 1rem 0;

  small {
    flex: 0 0 4.5rem;
    font-size: ${theme.fonts.size(-1)};
    color: ${theme.colors.secondary};
  }

  span {
    flex: 1;
    font-size: ${theme.fonts.size(size)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`}`

const Row = ({ size, index }) => (
  <StyledRow size={index}>
    <small>{size}pt</small>
    <span>Jinxed wizards pluck ivy from the big quilt.</span>
  </StyledRow>
)

Row.propTypes = {
  size: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
}

class Fonts extends React.PureComponent {
  render() {
    const { sizes } = this.props.theme.fonts

    return (
      <FontContainer>
        {sizes.map((size, index) => <Row key={size} size={size} index={index - BASE_SIZE} />)}
      </FontContainer>
    )
  }
}

Fonts.propTypes = {
  theme: PropTypes.shape({
    fonts: PropTypes.shape({
      sizes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
}

const ThemedFonts = withTheme(Fonts)

export default () => <ThemedFonts />
