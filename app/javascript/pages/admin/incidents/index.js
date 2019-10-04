import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Switch, Route } from 'react-router-dom'
import Details from './details'
import List from './list'

const Incidents = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/:id`} exact component={Details} />
    <Route path={match.path} exact component={List} />
  </Switch>
)

Incidents.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Incidents
