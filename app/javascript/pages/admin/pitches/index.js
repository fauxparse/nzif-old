import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import classNames from 'classnames'
import { Switch, Route } from 'react-router-dom'
import List from './list'
import Details from './details'

import './index.scss'

const Pitches = ({ className, location, match }) => (
  <section className={classNames('pitches', className)}>
    <Switch>
      <Route path={match.path} exact component={List} />
      <Route path={`${match.path}/:id`} component={Details} />
    </Switch>
  </section>
)

Pitches.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Pitches
