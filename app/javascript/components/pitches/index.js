import React from 'react'
import { Route, Switch } from 'react-router-dom'
import EditPitch from './edit'
import PitchList from './list'
import { SubPageTransition as PageTransition } from '../page_transition'

const Pitches = ({ match }) => (
  <Route
    render={({ location }) => (
      <PageTransition pageKey={location.pathname}>
        <Switch location={location}>
          <Route path={`${match.path}/new`} exact component={EditPitch} />
          <Route path={`${match.path}/:id`} exact component={EditPitch} />
          <Route path={`${match.path}`} exact component={PitchList} />
        </Switch>
      </PageTransition>
    )}
  />
)

export default Pitches
