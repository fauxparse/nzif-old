import React from 'react'
import classNames from 'classnames'
import { withRouter, Switch, Route } from 'react-router-dom'
import CommonProps from '../../../lib/common_props'
import List from './list'

const Pitches = ({ className, match }) => (
  <section className={classNames('pitches', className)}>
    <Switch>
      <Route path={match.path} exact component={List} />
    </Switch>
  </section>
)

Pitches.propTypes = {
  className: CommonProps.className,
}

export default withRouter(Pitches)
