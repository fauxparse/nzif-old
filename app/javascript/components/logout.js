import React from 'react'
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { CURRENT_USER_QUERY } from './shared/header/current_user'

const LOG_OUT_MUTATION = gql`
  mutation { logOut }
`
class LogOut extends React.Component {
  state = { loggedOut: false }

  componentDidMount() {
    this.logOut()
  }

  logOut = async () => {
    await this.props.mutate()
    this.setState({ loggedOut: true })
  }

  render() {
    return this.state.loggedOut ? <Redirect to="/" /> : null
  }
}

export default graphql(LOG_OUT_MUTATION, {
  options: {
    optimisticResponse: { logOut: null },
    update: proxy =>
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: null }
      })
  }
})(LogOut)
