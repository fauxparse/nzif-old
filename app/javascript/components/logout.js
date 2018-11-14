import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { CURRENT_USER_QUERY } from './shared/header/current_user'

const LOG_OUT_MUTATION = gql`
  mutation {
    logOut
  }
`

class LogOut extends React.Component {
  componentDidMount() {
    this.logOut()
  }

  logOut = async () => {
    await this.props.mutate()
    this.props.history.push('/')
  }

  render() {
    return null
  }
}

LogOut.propTypes = {
  mutate: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(
  graphql(LOG_OUT_MUTATION, {
    options: {
      optimisticResponse: { logOut: null },
      update: proxy =>
        proxy.writeQuery({
          query: CURRENT_USER_QUERY,
          data: { currentUser: null }
        })
    }
  })(LogOut)
)
