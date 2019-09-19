import React, { useCallback, useReducer } from 'react'
import { storiesOf } from '@storybook/react'
import times from 'lodash/times'
import faker from 'faker'
import Venues from './'

const VenuesDemo = () => {
  const dummyVenue = () => ({
    id: faker.random.uuid(),
    name: faker.lorem.words(),
    address: faker.address.streetAddress(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  })

  const dummyVenues = () => times(5, dummyVenue)
  
  const [venues, dispatch] = useReducer((venues, action) => {
    switch (action.type) {
      case 'add':
        return [...venues, { id: faker.random.uuid(), ...action.venue }]
      case 'delete':
        return venues.filter(v => v.id !== action.venue.id)
      case 'update':
        return venues.map(v => (v.id === action.venue.id ? { ...v, ...action.venue } : v))
      default:
        return venues
    }
  }, dummyVenues())

  const addVenue = useCallback((venue) => dispatch({ type: 'add', venue }), [dispatch])

  const deleteVenue = useCallback((venue) => dispatch({ type: 'delete', venue }), [dispatch])

  const updateVenue = useCallback((venue) => dispatch({ type: 'update', venue }), [dispatch])
  
  return (
    <Venues
      festival={{ year: 2019, adminRoot: '/admin/2019' }}
      venues={venues}
      onAddVenue={addVenue}
      onDeleteVenue={deleteVenue}
      onUpdateVenue={updateVenue}
    />
  )
}

storiesOf('Templates|Admin', module)
  .add('Venues', () => <VenuesDemo />)