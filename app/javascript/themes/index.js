import { css, createGlobalStyle } from 'styled-components'
import colors from './colors'
import fonts from './fonts'
import gradients from './gradients'
import layout from './layout'
import shadow from './shadows'

export const GlobalStyle = createGlobalStyle`${({ theme }) => css`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.base};
    line-height: ${theme.fonts.lineHeight};
    overflow-x: hidden;
  }
`}`

export default {
  colors,
  fonts,
  gradients,
  layout,
  shadow,
}
