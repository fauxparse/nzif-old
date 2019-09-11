import React, { Fragment, useCallback, useMemo, useState } from 'react'
import PropTypes from 'lib/proptypes'
import { useToggle } from 'lib/hooks'
import { DragDropContext } from 'react-beautiful-dnd'
import moment from 'lib/moment'
import entries from 'lodash/entries'
import first from 'lodash/first'
import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import sortBy from 'lodash/sortBy'
import Loader from 'atoms/loader'
import Breadcrumbs from 'molecules/breadcrumbs'
import Header from 'organisms/header'
import Timeslot from './timeslot'
import Finalized from './finalized'
import Confirmation from './confirmation'

export { useAllocations } from './hooks'

import './index.scss'

const Allocation = ({
  loading,
  finalizing,
  finalized,
  festival,
  seed,
  sessions,
  registrations,
  allocations,
  onShuffle,
  onMove,
  onFinalize,
}) => {
  const timeslots = useMemo(() => (
    sortBy(entries(groupBy(sessions, s => s.startsAt.valueOf())), [first])
      .map(([time, sessions]) => [moment(parseInt(time, 10)), sessions])
  ), [sessions])

  const registrationsById = useMemo(() => keyBy(registrations, r => r.id), [registrations])

  const [dragging, setDragging] = useState(null)

  const startDrag = useCallback(({ draggableId }) => {
    setDragging(registrationsById[draggableId.split('+')[0]])
  }, [setDragging, registrationsById])

  const endDrag = useCallback((drag) => {
    setDragging(null)
    const { source, destination } = drag
    if (destination) {
      const [time, sourceId = 'unallocated'] = source.droppableId.split('+')
      const [, destinationId = 'unallocated'] = destination.droppableId.split('+')
      onMove({
        time,
        source: sourceId,
        sourceIndex: source.index,
        destination: destinationId,
        destinationIndex: destination.index,
      })
    }
  }, [setDragging, onMove])

  const [confirming, , showConfirmation, hideConfirmation] = useToggle(false)

  const confirmPlacements = useCallback(() => {
    hideConfirmation()
    onFinalize()
  }, [hideConfirmation, onFinalize])

  return (
    <div className="allocation">
      <Header className="allocation__header">
        {festival.adminRoot && (
          <Breadcrumbs back={festival.adminRoot}>
            <Breadcrumbs.Link to={festival.adminRoot}>Dashboard</Breadcrumbs.Link>
          </Breadcrumbs>
        )}
        {!finalized && seed && (
          <Header.Button
            className="allocation__shuffle"
            icon="shuffle"
            disabled={loading}
            text={loading ? 'Shuffling…' : seed.toString()}
            onClick={onShuffle}
          />
        )}
        {!finalized && !loading && (
          <Header.Button primary text="Finalize" icon="alert" onClick={showConfirmation} />
        )}
        <Header.Title>Workshop allocation</Header.Title>
      </Header>
      <div className="allocation__body">
        {finalized ? <Finalized /> : (
          loading ? (
            <Loader />
          ) : (
            <Fragment>
              {finalizing ? (
                <Loader />
              ) : (
                <DragDropContext onDragStart={startDrag} onDragEnd={endDrag}>
                  {timeslots.map(([time, sessions]) => (
                    <Timeslot
                      key={time.valueOf()}
                      time={time}
                      sessions={sessions}
                      allocations={allocations[time.valueOf()] || {}}
                      registrationsById={registrationsById}
                      dragging={dragging}
                    />
                  ))}
                </DragDropContext>
              )}
              <Confirmation
                open={confirming}
                onConfirm={confirmPlacements}
                onCancel={hideConfirmation}
              />
            </Fragment>
          )
        )}
      </div>
    </div>
  )
}

Allocation.propTypes = {
  festival: PropTypes.festival.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.session.isRequired).isRequired,
  registrations: PropTypes.arrayOf(PropTypes.registration.isRequired).isRequired,
  allocations: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.arrayOf(PropTypes.allocation.isRequired)),
  ).isRequired,
  loading: PropTypes.bool,
  finalizing: PropTypes.bool,
  finalized: PropTypes.bool,
  seed: PropTypes.id,
  onShuffle: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onFinalize: PropTypes.func.isRequired,
}

Allocation.defaultProps = {
  loading: false,
  finalizing: false,
  finalized: false,
}

export default Allocation
