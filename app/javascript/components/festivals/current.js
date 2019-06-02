import React from 'react'
import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { HOMEPAGE_QUERY, HOMEPAGE_FRAGMENT } from '../../queries/homepage'

const CURRENT_FESTIVAL_QUERY = gql`
  {
    festival {
      ...HomepageFragment
    }
  }
  ${HOMEPAGE_FRAGMENT}
`

class CurrentFestival extends React.Component {
  componentDidMount() {
    const { client } = this.props
    client.query({ query: CURRENT_FESTIVAL_QUERY }).then(this.redirect)
  }

  redirect = ({ data: { festival } }) => {
    const { client, history, location } = this.props
    const { year } = festival

    client.writeQuery({
      query: HOMEPAGE_QUERY,
      data: { festival },
      variables: { year },
    })
    history.replace(`/${year}${location.pathname}`.replace(/\/$/, ''))
  }

  render() {
    return null
  }
}

CurrentFestival.propTypes = {
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(withApollo(CurrentFestival))
