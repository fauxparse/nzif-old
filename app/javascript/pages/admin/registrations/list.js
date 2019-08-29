import React, { useMemo } from 'react'
import { useQuery } from 'react-apollo-hooks'
import faker from 'faker'
import { useFestival } from 'contexts/festival'
import Template from 'templates/admin/registrations'
import REGISTRATIONS from 'queries/registrations'

const List = () => {
  const festival = useFestival()

  const { year } = festival

  const { loading, data } = useQuery(REGISTRATIONS, { variables: { year } })

  const registrations = useMemo(() => {
    if (loading || !data) {
      return new Array(20).fill(0).map(() => ({
        id: faker.random.uuid(),
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
      festival={festival}
      registrations={registrations}
    />
  )
}

export default List
