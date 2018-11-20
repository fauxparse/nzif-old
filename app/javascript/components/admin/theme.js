import React from 'react'
import { ThemeProvider } from 'styled-components'
import { invert } from '../../styles'

const Theme = ({ children }) => (
  <ThemeProvider theme={invert}>
    {children}
  </ThemeProvider>
)

export default Theme
