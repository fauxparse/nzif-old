import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './link'
import Ripple from '../ripple'
import { CURRENT_USER_QUERY } from '../../../queries'

const LOG_OUT_MUTATION = gql`
  mutation {
    logOut
  }
`

class LogOutLink extends React.Component {
  logOut = async () => {
    await this.props.mutate()
  }

  render() {
    const { children } = this.props

    return (
      <Link as={Ripple} onClick={this.logOut}>
        {children}
      </Link>
    )
  }
}

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
      })
  }
})(LogOutLink)
