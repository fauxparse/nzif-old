/* eslint-disable react/display-name */

import React from 'react'
import flatMap from 'lodash/flatMap'
import chroma from 'chroma-js'
import Clipboard from 'clipboard'
import Ripple from '../../components/shared/ripple'
import { PALETTE } from '../knobs'

const contrasting = color =>
  chroma.contrast(color, 'white') >= 4.5 ? 'white' : 'black'

class Palette extends React.PureComponent {
  render() {
    const names = Object.keys(PALETTE)
    const shades = Object.keys(PALETTE.grey)

    return (
      <div
        ref={el => el && new Clipboard(el.querySelectorAll('[data-clipboard-text]'))}
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateColumns: `repeat(${names.length}, 1fr)`,
          gridTemplateRows: `repeat(${shades.length + 1}, 2em)`,
          gridColumnGap: '0.5em',
          margin: '1em',
        }}
      >
        {flatMap(names, name => [
          <div
            key={name}
            style={{
              fontWeight: 'bold',
              lineHeight: '2em',
              textAlign: 'center',
              textTransform: 'uppercase',
              color: PALETTE[name][500],
            }}
          >
            {name}
          </div>,
          ...shades.map(key => {
            const color = PALETTE[name][key]

            return(
              <Ripple
                key={`${name}-${key}`}
                color={color}
                data-clipboard-text={color}
                style={{
                  background: color,
                  color: contrasting(color),
                  cursor: 'pointer',
                  lineHeight: '2em',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <b style={{
                  fontWeight: 'normal',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}>
                  {color}
                </b>
                <small style={{
                  position: 'absolute',
                  right: '0.5em',
                  bottom: '0.5em',
                  opacity: '0.5',
                  lineHeight: '1em',
                  fontSize: '0.5em',
                }}>
                  {key}
                </small>
              </Ripple>
            )
          })
        ])}
      </div>
    )
  }
}

export default () => <Palette />
