import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Switch, Route } from 'react-router-dom'
import List from './list'
import Details from './details'

const Registrations = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/:id`} component={Details} />
    <Route path={match.path} exact component={List} />
  </Switch>
)

Registrations.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Registrations
