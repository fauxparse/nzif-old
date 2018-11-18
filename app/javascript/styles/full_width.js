import { css } from 'styled-components'
import media, { SIZES } from './media'

const width = SIZES.large
const padding = 1

export const minFullWidth = width + padding * 2
export const sidePadding = `calc(50vw - ${`${SIZES.large / 2}rem`})`

export const fullWidth = css`
  padding: ${padding}rem;

  ${media(minFullWidth)`
    padding-left: ${sidePadding};
    padding-right: ${sidePadding};
  `}
`

export default fullWidth
