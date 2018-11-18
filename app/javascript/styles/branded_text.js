import { css } from 'styled-components'

const brandedText = css`
  font-family: ${props => props.theme.fonts.branding};
  font-family: ${props => props.theme.fonts.weights.black};
  text-transform: uppercase;
`

export default brandedText
