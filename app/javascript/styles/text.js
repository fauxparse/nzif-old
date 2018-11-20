import { css } from 'styled-components'

export const branded = css`
  font-family: ${props => props.theme.fonts.branding};
  font-family: ${props => props.theme.fonts.weights.black};
  text-transform: uppercase;
`

export default {
  branded,
}
