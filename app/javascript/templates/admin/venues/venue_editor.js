import React, { useCallback, useEffect, useReducer } from 'react'
import PropTypes from 'lib/proptypes'
import { useToggle } from 'lib/hooks'
import Button from 'atoms/button'
import Modal from 'molecules/modal'
import LabelledField from 'molecules/labelled_field'

const VenueEditor = ({ venue, onAddVenue, onDeleteVenue, onUpdateVenue, onClose }) => {
  const [open, , show, hide] = useToggle()

  const [attributes, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'reset':
        return action.venue
      case 'change':
        return { ...state, [action.name]: action.value }
      default:
        return state
    }
  }, venue)

  const changed = useCallback((e) => {
    const { name, value } = e.target
    dispatch({ type: 'change', name, value })
  }, [dispatch])

  const save = useCallback(() => {
    (venue.id ? onUpdateVenue : onAddVenue)(attributes)
    hide()
    onClose()
  }, [venue, attributes, onAddVenue, onUpdateVenue, hide, onClose])

  const cancel = useCallback(() => {
    hide()
    dispatch({ type: 'reset', venue })
    onClose()
  }, [hide, dispatch, venue, onClose])

  const deleteVenue = useCallback(() => {
    hide()
    onDeleteVenue(venue)
  }, [hide, onDeleteVenue, venue])

  const keyPressed = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      save()
    }
  }, [save])

  useEffect(() => {
    if (venue) {
      dispatch({ type: 'reset', venue })
      show()
    }
  }, [dispatch, venue, show])

  return attributes ? (
    <Modal
      isOpen={open}
      onRequestClose={hide}
    >
      <header className="modal__header">
        <h2 className="modal__title">Venue details</h2>
        <Button className="modal__close" icon="close" onClick={cancel} />
      </header>
      <div className="modal__body">
        <LabelledField
          name="name"
          label="Name"
          value={attributes.name}
          autoFocus
          onChange={changed}
          onKeyPress={keyPressed}
        />
        <LabelledField
          name="address"
          label="Address"
          value={attributes.address}
          onChange={changed}
          onKeyPress={keyPressed}
        />
      </div>
      <footer className="modal__footer">
        <Button primary text="Save" onClick={save} />
        {attributes.id && (
          <Button text="Delete" onClick={deleteVenue} />
        )}
      </footer>
    </Modal>
  ) : null
}

VenueEditor.propTypes = {
  venue: PropTypes.venue,
  onAddVenue: PropTypes.func.isRequired,
  onDeleteVenue: PropTypes.func.isRequired,
  onUpdateVenue: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default VenueEditor