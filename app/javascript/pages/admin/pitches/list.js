import React, { Fragment, useContext, useMemo } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import FestivalContext from 'contexts/festival'
import PITCHES_QUERY from 'queries/pitches'
import Button from 'atoms/button'
import Loader from 'atoms/loader'
import Breadcrumbs from 'molecules/breadcrumbs'
import Pitches from 'molecules/list'
import Pitch from 'molecules/pitch'
import Header from 'organisms/header'
import Filters, { useFilters } from './filters'

const List = ({ location, match }) => {
  const { year } = match.params

  const festival = useContext(FestivalContext) || {
    year,
    adminRoot: `/admin/${year}`,
  }

  const { adminRoot } = festival || {}

  const locationState = location.state || {}

  const [filters, setFilter] = useFilters(locationState.filters)

  const { loading, data } =
    useQuery(PITCHES_QUERY, { variables: { year, states: ['submitted'] } })

  const pitches = useMemo(() => {
    if (loading) return []

    const { pile, gender, origin, type } = filters
    let pitches = data.pitches

    if (pile.length) pitches = pitches.filter(pitch => pile.includes(pitch.pile || 'Unsorted'))
    if (gender.length) pitches = pitches.filter(pitch => gender.includes(pitch.gender))
    if (origin.length) pitches = pitches.filter(pitch => origin.includes(pitch.origin))
    if (type.length) pitches = pitches.filter(pitch => type.includes(pitch.activityType))

    return pitches
  }, [loading, data, filters])

  return (
    <div>
      <Header>
        <Breadcrumbs back={adminRoot}>
          <Breadcrumbs.Link to={adminRoot || '/'}>NZIF {festival.year}</Breadcrumbs.Link>
        </Breadcrumbs>
        <Header.Title>Pitches</Header.Title>
        <Filters
          filters={filters}
          onChange={setFilter}
        />
      </Header>
      {loading ? <Loader /> : (
        <Fragment>
          <p className="pitches__count">
            <span>{pitches.length} matching pitch(es)</span>
            <Button
              as={Link}
              to={{
                pathname: `${location.pathname}/print`,
                state: {
                  filters,
                  pitchIds: pitches.map(pitch => pitch.id),
                },
              }}
              text="Print"
              icon="print"
            />
            <Button
              as={Link}
              to={{
                pathname: `${location.pathname}/promote`,
                state: {
                  filters,
                  pitchIds: pitches.map(pitch => pitch.id),
                },
              }}
              text="Promote"
              icon="calendar"
            />
          </p>
          <Pitches className="pitches__list">
            {pitches.map(pitch => (
              <Pitch
                key={pitch.id}
                pitch={pitch}
                location={{
                  pathname: `${adminRoot}/pitches/${pitch.id}`,
                  state: { filters },
                }}
              />
            ))}
          </Pitches>
        </Fragment>
      )}
    </div>
  )
}

List.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
}

List.defaultProps = {
}

export default List
