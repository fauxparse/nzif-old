import React from 'react'
import classNames from 'classnames'
import { withRouter, Switch, Route } from 'react-router-dom'
import PropTypes from 'lib/proptypes'
import List from './list'
import Page from './page'

const Content = ({ className, match }) => (
  <section className={classNames('content', className)}>
    <Switch>
      <Route path={`${match.url}/:slug`} component={Page} />
      <Route path={match.url} exact component={List} />
    </Switch>
  </section>
)

Content.propTypes = {
  className: PropTypes.className,
}

export default withRouter(Content)
