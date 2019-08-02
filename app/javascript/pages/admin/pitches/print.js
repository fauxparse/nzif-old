import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'lib/proptypes'
import isEmpty from 'lodash/isEmpty'
import Printable from 'utils/printable'
import Details from './details'

const Print = ({ match, location, history }) => {
  const { year } = match.params

  const { pitchIds } = location.state

  const [loaded, setLoaded] = useState([])

  const pitchLoaded = useCallback((pitch) => {
    if (!loaded.includes(pitch.id)) {
      setLoaded([...loaded, pitch.id])
    }
  }, [loaded, setLoaded])

  const allLoaded = useMemo(() => {
    if (isEmpty(loaded)) return false

    return loaded.sort().join() === pitchIds.sort().join()
  }, [loaded, pitchIds])

  const goBack = useCallback(() => history.goBack(), [history])

  return (
    <Printable loading={!allLoaded} goBack={goBack}>
      {pitchIds.map(id => (
        <Details
          key={id}
          location={location}
          match={{
            ...match,
            params: { year, id }
          }}
          onLoad={pitchLoaded}
        />
      ))}
    </Printable>
  )
}

Print.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      pitchIds: PropTypes.arrayOf(PropTypes.id.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
}

export default Print
