import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import { SubPageTransition as PageTransition } from '../../components/page_transition'
import Header from '../../components/shared/header'
import Activities from '../activities'
import Home from './home'

const Page = styled.div``

const PageContent = styled.main`
  position: relative;
`

const Festival = ({ match }) => (
  <Page>
    <Header />

    <PageContent>
      <Route render={({ location }) => (
        <PageTransition pageKey={location.pathname}>
          <Switch location={location}>
            <Route path={`${match.path}/:type(shows|workshops)`} exact component={Activities} />
            <Route path={`${match.path}/`} exact component={Home} />
          </Switch>
        </PageTransition>
      )} />
    </PageContent>
  </Page>
)

Festival.propTypes = {
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired,
}

export default Festival
