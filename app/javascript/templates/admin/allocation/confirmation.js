import React from 'react'
import PropTypes from 'lib/proptypes'
import Button from 'atoms/button'
import Modal from 'molecules/modal'

const Confirmation = ({ open, onConfirm, onCancel }) => (
  <Modal isOpen={open} onRequestClose={onCancel}>
    <header className="modal__header">
      <h2 className="modal__title">Finalize allocation?</h2>
      <Button className="modal__close" icon="close" onClick={onCancel} />
    </header>
    <div className="modal__body">
      <p>
        This will confirm the workshop placements as shown.
      </p>
      <p>
        It will immediately send confirmation emails and invoices to all registered particpants.
      </p>
      <p>
        If you don’t know what you’re doing, press “Cancel” now, and I won’t tell anyone.
      </p>
    </div>
    <footer className="modal__footer">
      <Button primary text="Yes, I’m sure" onClick={onConfirm} />
      <Button text="Cancel" onClick={onCancel} />
    </footer>
  </Modal>
)

Confirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default Confirmation
