import { createGlobalStyle } from 'styled-components'

import colors from './colors'
import fonts from './fonts'
import gradients from './gradients'
import layout from './layout'
import transition from './transition'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${props => props.theme.fonts.base};
    line-height: 1.5;
  }
`

export default {
  colors,
  fonts,
  gradients,
  layout,
  transition,
}
