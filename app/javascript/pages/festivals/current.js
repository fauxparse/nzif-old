import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import { HOMEPAGE_QUERY, HOMEPAGE_FRAGMENT } from './home'

const CURRENT_FESTIVAL_QUERY = gql`
  {
    festival {
      ...HomepageFragment
    }
  }
  ${HOMEPAGE_FRAGMENT}
`

const CurrentFestival = () => (
  <Query query={CURRENT_FESTIVAL_QUERY}>
    {({ loading, data: { festival }, client }) => {
      if (!loading) {
        client.writeQuery({
          query: HOMEPAGE_QUERY,
          data: { festival },
          variables: { year: festival.year }
        })
        return <Redirect to={`/${festival.year}`} />
      } else {
        return null
      }
    }}
  </Query>
)

export default CurrentFestival
