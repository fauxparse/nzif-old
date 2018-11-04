import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

const invert = (theme) => {
  const { text, background, ...colors } = theme.colors
  return {
    ...theme,
    colors: {
      ...colors,
      text: background,
      background: text,
    },
  }
}

const Invert = ({ children }) => <ThemeProvider theme={invert}>{children}</ThemeProvider>

Invert.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
}

Invert.defaultProps = {
  children: null,
}

export default Invert
