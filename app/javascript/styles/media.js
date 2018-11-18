import { css } from 'styled-components'

export const SIZES = {
  small: 20,
  medium: 40,
  large: 60,
  huge: 80,
}

const mediaQuery = size => (...args) => css`
  @media (min-width: ${size}rem) {
    ${css(...args)};
  }
`

export default Object.keys(SIZES).reduce(
  (accumulator, label) => {
    accumulator[label] = mediaQuery(SIZES[label])
    return accumulator
  },
  mediaQuery
)
