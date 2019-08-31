import React, { useMemo } from 'react'
import { useQuery } from 'react-apollo-hooks'
import faker from 'faker'
import Template from 'templates/admin/registrations'
import REGISTRATIONS from 'queries/registrations'

const List = ({ match }) => {
  const { year } = match.params

  const { loading, data } = useQuery(REGISTRATIONS, { variables: { year } })

  const registrations = useMemo(() => {
    if (loading || !data) {
      return new Array(20).fill(0).map(() => ({
        id: faker.random.uuid(),
        state: 'pending',
        user: {
          id: faker.random.uuid(),
          name: faker.name.findName(),
        },
      }))
    } else {
      return data.registrations
    }
  }, [loading, data])

  return (
    <Template
      loading={loading}
      festival={{ year }}
      registrations={registrations}
    />
  )
}

export default List
