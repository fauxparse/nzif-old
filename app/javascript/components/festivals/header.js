import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import Header from '../shared/header'
import Menu from '../shared/menu'
import { HOMEPAGE_QUERY } from './home'

const FestivalHeader = ({ match }) => {
  const { year } = match.params
  const { data = {} } = useQuery(HOMEPAGE_QUERY, { variables: { year } })
  const { programmeLaunched, pitchesOpen } = data.festival || {}

  return (
    <Header>
      {programmeLaunched && (
        <>
          <Menu.Item icon="workshop" text="Workshops" to={`${match.url}/workshops`} />
          <Menu.Item icon="show" text="Shows" to={`${match.url}/shows`} />
        </>
      )}
      {pitchesOpen && <Menu.Item icon="pitch" text="Pitches" to={`${match.url}/pitches`} />}
    </Header>
  )
}

FestivalHeader.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default withRouter(FestivalHeader)
