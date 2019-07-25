import React, { Children, cloneElement, useMemo } from 'react'
import { v4 as uuid } from 'uuid'
import chunk from 'lodash/chunk'
import PropTypes from 'lib/proptypes'
import COLORS from '../../styles/theme/_colors.scss'

export const GRADIENTS = {
  tomato: [COLORS.tomato600, COLORS.mandarin400],
  grape: [COLORS.grape600, COLORS.plum400],
  mint: [COLORS.mint600, COLORS.apple400],
}

const fractionalize = (hex) =>
  chunk(hex.substr(1).split(''), 2).map(d => parseInt(d.join(''), 16) / 255.0)

const Duotone = ({ gradient, children }) => {
  const id = `duotone-${uuid()}`

  const [red, green, blue] = useMemo(() => {
    const [first, second] = GRADIENTS[gradient]
    const [r1, g1, b1] = fractionalize(first)
    const [r2, g2, b2] = fractionalize(second)
    return [
      `${r1} ${r2}`,
      `${g1} ${g2}`,
      `${b1} ${b2}`,
    ]
  }, [gradient])

  return <>
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
      <filter id={id}>
        <feColorMatrix
          type="matrix"
          result="grayscale"
          values="1 0 0 0 0
                  1 0 0 0 0
                  1 0 0 0 0
                  0 0 0 1 0"
        />
        <feComponentTransfer colorInterpolationFilters="sRGB" result="duotone">
          <feFuncR type="table" tableValues={red} />
          <feFuncG type="table" tableValues={green} />
          <feFuncB type="table" tableValues={blue} />
          <feFuncA type="table" tableValues="0 1" />
        </feComponentTransfer>
      </filter>
    </svg>
    {Children.map(children, child => cloneElement(child, { style: { filter: `url(#${id})` } }))}
  </>
}

Duotone.propTypes = {
  gradient: PropTypes.oneOf(Object.keys(GRADIENTS)),
}

Duotone.defaultProps = {
  gradient: 'tomato',
}

export default Duotone
