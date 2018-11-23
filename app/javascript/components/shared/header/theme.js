import React from 'react'
import { ThemeProvider } from 'styled-components'
import chroma from 'chroma-js'

const headerTheme = (theme) => {
  const { colors } = theme
  const white = chroma('#ffffff')
  const black = chroma('#000000')

  return {
    ...theme,
    colors: {
      ...colors,
      foreground: white.css(),
      background: colors.grey[700],
      text: white.alpha(colors.alpha.primary),
      secondary: white.alpha(colors.alpha.secondary).css(),
      disabled: white.alpha(colors.alpha.disabled).css(),
      border: black.alpha(1 - colors.alpha.border).css(),
      hoverBackground: black.alpha(colors.alpha.hover).css(),
    },
  }
}

const Theme = ({ children }) => <ThemeProvider theme={headerTheme}>{children}</ThemeProvider>

export default Theme
