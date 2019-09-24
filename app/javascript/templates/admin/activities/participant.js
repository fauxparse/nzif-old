import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import { Draggable } from 'react-beautiful-dnd'
import Chip from 'molecules/chip'

const Participant = ({ registration, index }) => (
  <Draggable draggableId={registration.id} index={index}>
    {(provided, { isDragging }) => (
      <Chip
        ref={provided.innerRef}
        small
        user={registration.user}
        className={classNames(
          'roll__participant',
          isDragging && 'rollParticipant.isDragging',
        )}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      />
    )}
  </Draggable>
)

Participant.propTypes = {
  registration: PropTypes.draggableRegistration.isRequired,
  index: PropTypes.number.isRequired,
}

export default Participant