/* eslint-disable react/display-name */

import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import flatMap from 'lodash/flatMap'
import chroma from 'chroma-js'
import Clipboard from 'clipboard'
import Ripple from '../../components/shared/ripple'
import BrandedText from '../../styles/branded_text'

const contrasting = color =>
  chroma.contrast(color, 'white') >= 4.5 ? 'white' : 'black'

const Header = styled(BrandedText)`
  color: ${props => props.color};
  font-weight: bold;
  line-height: 2em;
  text-align: center;
  text-transform: uppercase;
`

const Chip = styled(Ripple)`
  background: ${props => props.color};
  color: ${props => contrasting(props.color)};
  cursor: pointer;
  line-height: 2em;
  text-align: center;

  b {
    font-weight: normal;
    font-family: monospace;
  }

  small {
    position: absolute;
    right: 0.5em;
    bottom: 0.5em;
    opacity: 0.5;
    line-height: 1em;
    font-size: 0.5em;
  }
`

const PaletteContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: repeat(${props => props.rows + 1}, 2em);
  grid-column-gap: 0.5em;
  margin: 1em;
`

class Palette extends React.PureComponent {
  render() {
    const { palette } = this.props.theme.colors
    const names = Object.keys(palette)
    return (
      <PaletteContainer
        columns={names.length}
        rows={Object.keys(palette[names[0]]).length}
        ref={el => el && new Clipboard(el.querySelectorAll('[data-clipboard-text]'))}
      >
        {flatMap(names, name => [
          <Header key={name} color={palette[name][500]}>{name}</Header>,
          ...Object.keys(palette[name]).sort().map(key => (
            <Chip
              key={`${name}-${key}`}
              color={palette[name][key]}
              data-clipboard-text={palette[name][key]}
            >
              <b>{palette[name][key]}</b>
              <small>{key}</small>
            </Chip>
          ))
        ])}
      </PaletteContainer>
    )
  }
}

Palette.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      palette: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}

const ThemedPalette = withTheme(Palette)

export default () => <ThemedPalette />
