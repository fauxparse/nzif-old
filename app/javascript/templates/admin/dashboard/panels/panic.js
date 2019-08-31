import React from 'react'
import { withRouter } from 'react-router-dom'
import { useQuery, useMutation } from 'react-apollo'
import Switch from 'atoms/switch'
import Panel from '../panel'
import gql from 'graphql-tag'

const QUERY = gql`
  query panicMode($year: ID!) {
    festival(year: $year) {
      panic
    }
  }
`

const MUTATION = gql`
  mutation panicMode($year: ID!, $panic: Boolean!) {
    panicMode(year: $year, panic: $panic)
  }
`

const PanicMode = ({ match }) => {
  const { year } = match.params

  const { loading, data } = useQuery(QUERY, { variables: { year } })

  const [save] = useMutation(MUTATION, {
    update: (cache, { data: { panicMode } }) => {
      const variables = { year }
      const query = QUERY
      const existing = cache.readQuery({ query, variables })
      cache.writeQuery({
        query,
        variables,
        data: {
          festival: {
            ...existing.festival,
            panic: panicMode,
          },
        },
      })
    }
  })

  const setPanicMode = panic => save({
    variables: { year, panic },
    optimisticResponse: { panicMode: panic }
  })

  const checkboxChanged = (e) => setPanicMode(e.target.checked)

  const { panic } = data.festival || {}

  return (
    <Panel
      className="dashboard__panic"
      title="Panic mode"
      loading={loading}
    >
      {!loading && (
        <>
          <Switch className="panic-button" checked={panic} onChange={checkboxChanged} />
          <p>Panic mode is <b>{panic ? 'ON' : 'OFF'}</b></p>
        </>
      )}
    </Panel>
  )
}

export default withRouter(PanicMode)
