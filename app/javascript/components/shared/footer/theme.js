import React from 'react'
import { ThemeProvider } from 'styled-components'
import { invert } from '../../../styles'
import merge from 'lodash/merge'

const footerTheme = theme =>
  merge(invert(theme), { colors: { background: theme.colors.grey(600) } })

const Theme = ({ children }) => <ThemeProvider theme={footerTheme}>{children}</ThemeProvider>

export default Theme
