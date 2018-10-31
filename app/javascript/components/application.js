import React, { Fragment } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import theme, { GlobalStyle } from '../themes'
import Header from './shared/header'

const client = new ApolloClient({
  uri: '/graphql',
  headers: {
    'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content,
  },
})

export default class Application extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyle />
            <Header />
          </Fragment>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}
