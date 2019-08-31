import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useQuery, useSubscription } from 'react-apollo'
import Counter from 'molecules/counter'
import Button from 'atoms/button'
import Panel from '../panel'
import gql from 'graphql-tag'

const QUERY = gql`
  query registrationCount($year: ID!) {
    registrationCount(year: $year)
  }
`

const SUBSCRIPTION = gql`
  subscription registrationCount($year: ID!) {
    registrationCount(year: $year)
  }
`

const Registrations = ({ match }) => {
  const { year } = match.params

  const variables = { year }

  const { loading, data, subscribeToMore } = useQuery(QUERY, { variables })

  subscribeToMore({
    document: SUBSCRIPTION,
    variables,
    updateQuery: (previous, { subscriptionData }) => ({
      ...previous,
      ...(subscriptionData.data)
    }),
  })

  return (
    <Panel className="dashboard__registrations" title="Registrations" loading={loading}>
      {!loading && (
        <>
          <Counter>
            <Counter.Group digits={data.registrationCount} pad={3} label="Completed" />
          </Counter>
          <Button as={Link} to="/">
            View
          </Button>
        </>
      )}
    </Panel>
  )
}

export default withRouter(Registrations)
