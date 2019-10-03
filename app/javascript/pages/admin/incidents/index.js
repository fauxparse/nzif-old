import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Switch, Route } from 'react-router-dom'
import List from './list'

const Incidents = ({ match }) => (
  <Switch>
    <Route path={match.path} exact component={List} />
  </Switch>
)

Incidents.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Incidents
