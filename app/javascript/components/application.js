import React, { Fragment } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme, { GlobalStyle } from '../themes'
import { RootPageTransition as PageTransition } from './page_transition'
import Festival from '../pages/festivals'
import LogIn from './login'
import LogOut from './logout'
import CurrentFestival from '../pages/festivals/current'

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Festival': return `Festival:${object.year}`
      default: return defaultDataIdFromObject(object)
    }
  }
})

const client = new ApolloClient({
  cache,
  uri: '/graphql',
  headers: {
    'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content,
  },
  onError: ({ graphQLErrors, networkError, response, operation }) => {},
})

export default class Application extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyle />
            <Router>
              <Route render={({ location }) => (
                <PageTransition pageKey={location.pathname.split('/')[1]}>
                  <Switch location={location}>
                    <Route path="/:year(\d{4})" component={Festival} />
                    <Route path="/login" component={LogIn} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={CurrentFestival} />
                  </Switch>
                </PageTransition>
              )} />
            </Router>
          </Fragment>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}
