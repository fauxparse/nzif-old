import React, { useMemo } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery } from 'react-apollo-hooks'
import Loader from 'atoms/loader'
import List from 'molecules/list'
import ListItem from './list_item'
import { PITCHES_QUERY } from '../../../queries'

const PitchList = ({ match }) => {
  const { year } = match.params
  const states = ['submitted']
  const { loading, data } = useQuery(PITCHES_QUERY, { variables: { year, states } })

  const pitches = useMemo(
    () => !loading && data.pitches,
    [loading, data]
  )

  return (
    <div className="pitch__admin">
      <header>
        <h1 className="page-title">Pitches</h1>
      </header>

      {loading ? <Loader /> : (
        <List className="pitches">
          {pitches.map(pitch => (
            <ListItem
              key={pitch.id}
              pitch={pitch}
              baseUrl={match.url}
            />
          ))}
        </List>
      )}
    </div>
  )
}

PitchList.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default PitchList
