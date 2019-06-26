import React, { Component } from 'react'
import PropTypes from 'lib/proptypes'
import { graphql } from 'react-apollo'
import { VENUES_QUERY } from '../../queries'
import VenueList from './venue_list'
import Map from './map'

class VenueMap extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      venues: PropTypes.arrayOf(PropTypes.venue.isRequired)
    })
  }

  state = {
    selection: undefined
  }

  venueClicked = venue => this.setState({ selection: venue })

  render() {
    const {
      data: { loading, venues }
    } = this.props
    const { selection } = this.state

    return (
      <div className="venues-with-map">
        <VenueList
          loading={loading}
          venues={venues}
          onVenueClick={this.venueClicked}
          selection={selection}
        />
        <Map
          venues={loading ? [] : venues}
          selection={selection}
          onVenueClick={this.venueClicked}
        />
      </div>
    )
  }
}

export default graphql(VENUES_QUERY)(VenueMap)
