import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import classNames from 'classnames'
import { Switch, Route } from 'react-router-dom'
import List from './list'

const Pitches = ({ className, match }) => (
  <section className={classNames('pitches', className)}>
    <Switch>
      <Route path={match.path} exact component={List} />
    </Switch>
  </section>
)

Pitches.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Pitches
