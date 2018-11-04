import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import Header from '../../components/shared/header'
import Activities from '../activities'
import Home from './home'

const Festival = ({ match }) => (
  <Fragment>
    <Header />

    <Switch>
      <Route path={`${match.path}/:type(shows|workshops)`} exact component={Activities} />
      <Route path={`${match.path}/`} exact component={Home} />
    </Switch>
  </Fragment>
)

Festival.propTypes = {
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired,
}

export default Festival
