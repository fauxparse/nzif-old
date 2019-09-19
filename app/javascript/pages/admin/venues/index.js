import React from 'react'
import { useQuery } from 'react-apollo'
import Template from 'templates/admin/venues'
import { useFestival } from 'contexts/festival'
import Loader from 'atoms/loader'
import VENUES from 'queries/venues'

const Venues = () => {
  const { loading, data } = useQuery(VENUES)

  const festival = useFestival()

  return festival ? (
    <Template
      loading={loading}
      festival={festival}
      venues={(data && data.venues) || []}
      onAddVenue={() => {}}
      onDeleteVenue={() => {}}
      onUpdateVenue={() => {}}
    />
  ) : <Loader />
}

export default Venues