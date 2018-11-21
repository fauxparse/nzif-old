import React, { Fragment } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import { ThemeProvider } from 'styled-components'
import theme, { GlobalStyle } from '../themes'
import client from '../lib/client'
import { RootPageTransition as PageTransition } from './page_transition'
import Admin from './admin'
import Festival, { CurrentFestival } from './festivals'
import LogIn from './login'
import Environment from './environment'

const getPageKey = (location) => {
  const key = location.pathname.split('/')[1]
  return (key === 'signup') ? 'login' : key
}

export default class Application extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyle />
            <Router>
              <LastLocationProvider>
                <Route render={({ location }) => (
                  <PageTransition pageKey={getPageKey(location)}>
                    <Switch location={location}>
                      <Route path="/admin" component={Admin} />
                      <Route path="/:year(\d{4})" component={Festival} />
                      <Route path="/:login(login|signup)" component={LogIn} />
                      <Route path="/" exact component={CurrentFestival} />
                    </Switch>
                  </PageTransition>
                )} />
              </LastLocationProvider>
            </Router>
            <Environment />
          </Fragment>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}
