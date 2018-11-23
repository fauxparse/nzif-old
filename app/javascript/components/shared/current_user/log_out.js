import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Ripple from '../ripple'
import { CURRENT_USER_QUERY } from '../../../queries'

const LOG_OUT_MUTATION = gql`
  mutation {
    logOut
  }
`

class LogOutLink extends React.Component {
  logOut = () => {
    this.props.mutate()
  }

  render() {
    const { children, ...props } = this.props

    return (
      <Ripple {...props} onClick={this.logOut}>
        {children}
      </Ripple>
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
      }),
  }
})(LogOutLink)
