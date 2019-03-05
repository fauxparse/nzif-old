import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewPitch from './new'
import PitchList from './list'
import { SubPageTransition as PageTransition } from '../page_transition'

const Pitches = ({ match }) => (
  <Route
    render={({ location }) => (
      <PageTransition pageKey={(location.pathname || '').split('/').length.toString()}>
        <Switch location={location}>
          <Route path={`${match.path}/new`} exact component={NewPitch} />
          <Route path={`${match.path}`} exact component={PitchList} />
        </Switch>
      </PageTransition>
    )}
  />
)

export default Pitches
