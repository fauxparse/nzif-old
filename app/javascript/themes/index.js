import { css, createGlobalStyle } from 'styled-components'
import { media } from '../styles'
import colors from './colors'
import fonts from './fonts'
import gradients from './gradients'
import layout from './layout'
import shadow from './shadows'

import { transitionStyles } from '../components/page_transition'

const noYuckyHighlight = css`
  -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
  -webkit-transition-delay: 9999s;
`

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.base};
    line-height: 1.5;
    overflow-x: hidden;
  }

  input,
  textarea,
  select {
    &:-internal-autofill-previewed,
    &:-internal-autofill-selected {
      ${noYuckyHighlight};
    }

    &:-webkit-autofill {
      ${noYuckyHighlight};
    }
  }

  ${transitionStyles}
`

export default {
  colors,
  fonts,
  gradients,
  layout,
  shadow,
}
