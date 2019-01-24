import React from 'react'
import { ThemeProvider } from 'styled-components'
import merge from 'lodash/merge'
import { invert } from '../../styles'

const adminTheme = theme =>
  merge(
    invert(theme),
    {
      colors: {
        background: theme.colors.grey(800),
        border: theme.colors.grey(600),
        text: theme.colors.grey(100),
        secondary: theme.colors.grey(400),
        disabled: theme.colors.grey(600),
        modalBackground: theme.colors.grey(800),
        outline: theme.colors.outline.alpha(0.625),
        panelBackground: theme.colors.grey(900),
        icon: theme.colors.grey(600),
      }
    }
  )

const Theme = ({ children }) => (
  <ThemeProvider theme={adminTheme}>
    {children}
  </ThemeProvider>
)

export default Theme
