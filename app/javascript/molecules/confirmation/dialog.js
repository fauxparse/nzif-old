import React from 'react'
import PropTypes from 'lib/proptypes'
import Button from 'atoms/button'
import Checkbox from 'atoms/checkbox'
import Modal from 'molecules/modal'

const ConfirmationDialog = ({
  open,
  title,
  confirm,
  cancel,
  dontShow,
  onDontShow,
  onConfirm,
  onCancel,
  children,
  ...props
}) => (
  <Modal isOpen={open} onRequestClose={onCancel} {...props}>
    <header className="modal__header">
      <h2 className="modal__title">{title}</h2>
      <Button className="modal__close" icon="close" onClick={onCancel} />
    </header>
    <div className="modal__body">
      {children}
      {onDontShow && (
        <Checkbox checked={dontShow} onChange={e => onDontShow(e.target.checked)}>
          Don’t show this message again
        </Checkbox>
      )}
    </div>
    <footer className="modal__footer">
      <Button primary text={confirm} onClick={onConfirm} />
      <Button text={cancel} onClick={onCancel} />
    </footer>
  </Modal>
)

ConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  confirm: PropTypes.string,
  cancel: PropTypes.string,
  dontShow: PropTypes.bool,
  onDontShow: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

ConfirmationDialog.defaultProps = {
  open: false,
  title: 'Are you sure?',
  confirm: 'Yes, I’m sure',
  cancel: 'Cancel',
  dontShow: false,
  onDontShow: null,
}

export default ConfirmationDialog
