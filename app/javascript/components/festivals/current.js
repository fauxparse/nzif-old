import React from 'react'
import PropTypes from 'lib/proptypes'
import { useQuery } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import Loader from 'atoms/loader'

const CURRENT_FESTIVAL_QUERY = gql`
  {
    festival {
      year
    }
  }
`

const CurrentFestival = ({ location }) => {
  const { loading, data } = useQuery(CURRENT_FESTIVAL_QUERY)

  return loading
    ? <Loader />
    : <Redirect to={`/${data.festival.year}${location.pathname}`.replace(/\/$/, '')} />
}

CurrentFestival.propTypes = {
  location: PropTypes.location.isRequired,
}

export default CurrentFestival
