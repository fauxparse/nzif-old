import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import theme, { GlobalStyle } from '../themes'
import Header from './shared/header'

export default class Application extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <Header />
        </Fragment>
      </ThemeProvider>
    )
  }
}
