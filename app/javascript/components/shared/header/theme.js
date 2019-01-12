import React from 'react'
import { ThemeProvider } from 'styled-components'

const headerTheme = (theme) => {
  const { colors } = theme
  const black = colors.black()
  const white = colors.white()

  return {
    ...theme,
    colors: {
      ...colors,
      foreground: white,
      background: colors.grey(900),
      text: white.alpha(colors.alpha.primary),
      secondary: white.alpha(colors.alpha.secondary),
      disabled: white.alpha(colors.alpha.disabled),
      border: black.alpha(1 - colors.alpha.border),
      hoverBackground: black.alpha(colors.alpha.hover),
    },
  }
}

const Theme = ({ children }) => <ThemeProvider theme={headerTheme}>{children}</ThemeProvider>

export default Theme
