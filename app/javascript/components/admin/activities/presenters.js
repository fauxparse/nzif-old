import React, { Fragment, useCallback, useState } from 'react'
import PropTypes from 'lib/proptypes'
import { usePermission } from 'lib/permissions'
import Button from 'atoms/button'
import Chip from 'molecules/chip'
import Modal from 'molecules/modal'
import AddPresenter from './add_presenter'

const Presenters = ({ activity, presenters, onChange }) => {
  const editable = usePermission('update', activity)

  const [adding, setAdding] = useState(false)

  const openDialog = useCallback(() => setAdding(true), [setAdding])

  const closeDialog = useCallback(() => setAdding(false), [setAdding])

  const addPresenter = useCallback((presenter) => {
    closeDialog()
    onChange([...presenters, presenter])
  }, [presenters, onChange, closeDialog])

  const deletePresenter = useCallback((presenter) => {
    onChange(presenters.filter(p => p !== presenter))
  }, [presenters, onChange])

  return (
    <div className="presenters">
      {presenters.map(presenter => (
        <Chip
          key={presenter.id}
          user={presenter}
          onDelete={editable ? deletePresenter : null}
        />
      ))}
      {editable && (
        <Fragment>
          <Button
            className="presenters__add"
            icon="add"
            text="Add presenter"
            onClick={openDialog}
          />
          <Modal isOpen={adding} className="modal--autocomplete" onRequestClose={closeDialog}>
            <AddPresenter presenters={presenters} onSelect={addPresenter} />
          </Modal>
        </Fragment>
      )}
    </div>
  )
}

Presenters.propTypes = {
  activity: PropTypes.activity.isRequired,
  presenters: PropTypes.arrayOf(PropTypes.user.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Presenters
