import React from 'react'
import PropTypes from 'lib/proptypes'
import pluralize from 'pluralize'
import Skeleton from 'effects/skeleton'
import Breadcrumbs from 'molecules/breadcrumbs'
import Header from 'organisms/header'
import dummy from './dummy'

const Details = ({ loading, festival, activity }) => {
  const { type, name } = (!loading && activity) || dummy()

  const back = `/${festival.year}/${pluralize(type)}`

  return (
    <div>
      <Header colored>
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>NZIF {festival.year}</Breadcrumbs.Link>
        </Breadcrumbs>
        <Skeleton as={Header.Title} loading={loading}>
          {loading ? 'Activity name' : name}
        </Skeleton>
      </Header>
    </div>
  )
}

Details.propTypes = {
  loading: PropTypes.bool,
  activity: PropTypes.activity,
  festival: PropTypes.shape({
    year: PropTypes.id.isRequired,
  }).isRequired,
}

Details.defaultProps = {
  loading: false,
  activity: undefined,
}

export default Details
