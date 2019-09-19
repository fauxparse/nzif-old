import React, { useCallback, useState } from 'react'
import PropTypes from 'lib/proptypes'
import Breadcrumbs from 'molecules/breadcrumbs'
import List from 'molecules/list'
import Header from 'organisms/header'
import Venue from './venue'
import VenueEditor from './venue_editor'

import './index.scss'

const Venues = ({ festival, venues, onAddVenue, onDeleteVenue, onUpdateVenue }) => {
  const [venue, setVenue] = useState()

  const newVenue = useCallback(() => setVenue({ name: '', address: '' }), [setVenue])

  return (
    <section className="venue-admin">
      <Header>
        <Breadcrumbs back={festival.adminRoot}>
          <Breadcrumbs.Link to={festival.adminRoot}>NZIF {festival.year}</Breadcrumbs.Link>
        </Breadcrumbs>
        <Header.Button icon="add" onClick={newVenue} />
        <Header.Title>Venues</Header.Title>
      </Header>
      <div className="venue-admin__body">
        <List className="venues">
          {venues.map(venue => (
            <Venue
              key={venue.id}
              venue={venue}
              onClick={setVenue}
            />
          ))}
        </List>
      </div>
      <VenueEditor
        venue={venue}
        onAddVenue={onAddVenue}
        onDeleteVenue={onDeleteVenue}
        onUpdateVenue={onUpdateVenue}
      />
    </section>
  )
}

Venues.propTypes = {
  loading: PropTypes.bool,
  festival: PropTypes.festival.isRequired,
  venues: PropTypes.arrayOf(PropTypes.venue).isRequired,
  onAddVenue: PropTypes.func.isRequired,
  onDeleteVenue: PropTypes.func.isRequired,
  onUpdateVenue: PropTypes.func.isRequired,
}

export default Venues