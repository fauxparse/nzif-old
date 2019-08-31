import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useQuery, useSubscription } from 'react-apollo-hooks'
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
  query registrationCount($year: ID!) {
    registrationCount(year: $year)
  }
`

const Registrations = ({ match }) => {
  const { year } = match.params

  const variables = { year }

  const [count, setCount] = useState(0)

  const { loading, data: initialData } = useQuery(QUERY, { variables })

  const { data: subscriptionData } = useSubscription(SUBSCRIPTION, { variables })

  useEffect(() => {
    if (initialData) setCount(initialData.registrationCount)
  }, [setCount, initialData])

  useEffect(() => {
    if (subscriptionData) setCount(subscriptionData.registrationCount)
  }, [setCount, subscriptionData])

  return (
    <Panel className="dashboard__registrations" title="Registrations" loading={loading}>
      {!loading && (count != undefined) && (
        <>
          <Counter>
            <Counter.Group digits={count} pad={3} label="Completed" />
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
