import { createGlobalStyle } from 'styled-components'

import colors from './colors'
import fonts from './fonts'
import layout from './layout'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${props => props.theme.fonts.base};
  }
`

export default {
  colors,
  fonts,
  layout,
}
