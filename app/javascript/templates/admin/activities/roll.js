import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useConfirmation } from 'molecules/confirmation'
import Participant from './participant'

const Roll = ({ placements, waitlist, capacity, onChange }) => {
  const cached = useRef({ placements, waitlist })

  const resetLists = useCallback(() => {
    cached.current = { placements, waitlist }
  }, [cached, placements, waitlist])

  const confirmPlacement = useCallback(() => {
    onChange(cached.current)
  }, [onChange, cached])

  useEffect(resetLists, [resetLists, placements, waitlist])

  const { confirm } = useConfirmation()

  const confirmRemoval = useCallback((registration) => 
    confirm('removeFromSession', {
      title: 'Remove participant?',
      message: `Are you sure you want to remove ${registration.user.name} from this session?`,
    }),
    [confirm])

  const confirmOverFill = useCallback((registration) =>
    confirm('moveToFullSession', {
      title: 'Over-fill this session?',
      message: `Adding ${registration.user.name} would exceed capacity. Are you sure?`,
    }),
    [confirm])

  const dragEnd = useCallback(({ source, destination }) => {
    if (destination) {
      const { droppableId: from, index: fromIndex } = source
      const { droppableId: to, index: toIndex } = destination

      const fromList = [...cached.current[from]]
      const toList = from === to ? fromList : [...cached.current[to]]
      const [registration] = fromList.splice(fromIndex, 1)
      toList.splice(toIndex, 0, registration)
      cached.current = { ...cached.current, [from]: fromList, [to]: toList }

      if (from === 'placements') {
        if (to === 'waitlist') {
          confirmRemoval(registration)
            .then(confirmPlacement)
            .catch(resetLists)
        } else {
          confirmPlacement()
        }
      } else {
        if (to === 'placements' && placements.length >= capacity) {
          confirmOverFill(registration)
            .then(confirmPlacement)
            .catch(resetLists)
        } else {
          confirmPlacement()
        }
      }
    }
  }, [
    cached,
    confirmRemoval,
    confirmPlacement,
    resetLists,
    placements,
    capacity,
    confirmOverFill,
  ])

  return (
    <div className="roll edit-activity__roll">
      <DragDropContext onDragEnd={dragEnd}>
        <div className="roll__section">
          <h3 className="roll__title">
            Participants ({cached.current.placements.length}/{capacity})
          </h3>
          <Droppable
            droppableId="placements"
          >
            {provided => (
              <div
                ref={provided.innerRef}
                className="roll__list"
                {...provided.droppableProps}
              >
                {cached.current.placements.map((registration, index) => (
                  <Participant
                    key={registration.id}
                    registration={registration}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="roll__section">
          <h3 className="roll__title">
            Waitlist
          </h3>
          <Droppable
            droppableId="waitlist"
          >
            {provided => (
              <div
                ref={provided.innerRef}
                className="roll__list"
                {...provided.droppableProps}
              >
                {cached.current.waitlist.map((registration, index) => (
                  <Participant
                    key={registration.id}
                    registration={registration}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
}

Roll.propTypes = {
  placements: PropTypes.arrayOf(PropTypes.draggableRegistration.isRequired).isRequired,
  waitlist: PropTypes.arrayOf(PropTypes.draggableRegistration.isRequired).isRequired,
  capacity: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Roll
