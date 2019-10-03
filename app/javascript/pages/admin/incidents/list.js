import React, { useMemo } from 'react'
import { useQuery } from 'react-apollo-hooks'
import faker from 'faker'
import Template from 'templates/admin/incidents'
import INCIDENTS from 'queries/incidents'

const List = ({ match }) => {
  const { year } = match.params

  const { loading, data } = useQuery(INCIDENTS, { variables: { year } })

  const incidents = useMemo(() => {
    if (loading || !data) {
      return new Array(50).fill(0).map(() => ({
        id: faker.random.uuid(),
        state: 'open',
        user: {
          name: faker.name.findName(),
        },
      }))
    } else {
      return data.incidents
    }
  }, [loading, data])

  return (
    <Template
      loading={loading}
      festival={{ year }}
      incidents={incidents}
    />
  )
}

export default List
