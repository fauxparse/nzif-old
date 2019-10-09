import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import { useSticky } from 'lib/hooks'
import Skeleton from 'effects/skeleton'

import './index.scss'

const Timeslot = ({ time, loading, offset, children }) => {
  const options = useMemo(() => ({ stickyBitStickyOffset: offset }), [offset])

  const header = useSticky(options)

  return (
    <div className="timeslot">
      <Skeleton ref={header} as="h3" className="timeslot__time" loading={loading && false}>
        {time.hour() ? time.format('h:mm A') : null}
      </Skeleton>
      <div className="timeslot__activities">
        {children}
      </div>
    </div>
  )
}

Timeslot.propTypes = {
  loading: PropTypes.bool.isRequired,
  time: PropTypes.shape({
    format: PropTypes.func.isRequired,
    hour: PropTypes.func.isRequired,
  }).isRequired,
  offset: PropTypes.number,
}

Timeslot.defaultProps = {
  offset: 0,
}


export default Timeslot
