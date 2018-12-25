import React from 'react'
import { ThemeProvider } from 'styled-components'
import merge from 'lodash/merge'
import { invert } from '../../styles'

const adminTheme = theme =>
  merge(
    invert(theme),
    {
      colors: {
        background: theme.colors.grey[600],
        modalBackground: theme.colors.grey[700],
      }
    }
  )

const Theme = ({ children }) => (
  <ThemeProvider theme={adminTheme}>
    {children}
  </ThemeProvider>
)

export default Theme
