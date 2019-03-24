import React from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
import { withApollo, compose } from 'react-apollo'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import Icon from '../../icons'
import Ripple from '../ripple'
import { CURRENT_USER_QUERY } from '../../../queries'

const LOG_OUT_MUTATION = gql`
  mutation {
    logOut
  }
`

const LogOutLink = ({ client, history }) => {
  const logOut = useMutation(LOG_OUT_MUTATION, {
    optimisticResponse: { logOut: null },
    update: proxy =>
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: null }
      }),
  })

  const logOutClicked = () =>
    logOut()
      .then(() => {
        client.resetStore()
        setTimeout(() => history.push('/'), 50)
      })

  return (
    <Ripple className="menu__item" onClick={logOutClicked}>
      <Icon className="menu__icon" name="log-out" />
      <span className="menu__text">Log out</span>
    </Ripple>
  )
}

LogOutLink.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }),
}

export default compose(withApollo, withRouter)(LogOutLink)
