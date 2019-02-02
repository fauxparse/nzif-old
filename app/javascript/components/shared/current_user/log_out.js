import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Icon from '../../icons'
import Ripple from '../ripple'
import { CURRENT_USER_QUERY } from '../../../queries'

const LOG_OUT_MUTATION = gql`
  mutation {
    logOut
  }
`

const LogOutLink = ({ mutate }) =>
  <Ripple className="menu__item" onClick={mutate}>
    <Icon className="menu__icon" name="log-out" />
    <span className="menu__text">Log out</span>
  </Ripple>

LogOutLink.propTypes = {
  mutate: PropTypes.func.isRequired,
}

export default graphql(LOG_OUT_MUTATION, {
  options: {
    optimisticResponse: { logOut: null },
    update: proxy =>
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: null }
      }),
  }
})(LogOutLink)
