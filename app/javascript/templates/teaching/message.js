import React, { useCallback, useState } from 'react'
import PropTypes from 'lib/proptypes'
import Button from 'atoms/button'
import LabelledField from 'molecules/labelled_field'
import Modal from 'molecules/modal'

const Message = ({ open, onCancel, onSend }) => {
  const [subject, setSubject] = useState('')

  const subjectChanged = useCallback(e => setSubject(e.target.value), [setSubject])

  const [body, setBody] = useState('')

  const bodyChanged = useCallback(e => setBody(e.target.value), [setBody])

  const send = useCallback(() => {
    onSend({ subject, body })
  }, [subject, body, onSend])

  return (
    <Modal className="compose-message" isOpen={open} onRequestClose={onCancel}>
      <header className="modal__header">
        <h2 className="modal__title">New message</h2>
        <Button className="modal__close" icon="close" onClick={onCancel} />
      </header>
      <div className="modal__body">
        <LabelledField
          label="Subject"
          autoSize
          autoFocus
          multiline
          name="subject"
          value={subject}
          onChange={subjectChanged}
        />
        <LabelledField
          label="Message"
          autoSize
          multiline
          name="body"
          value={body}
          onChange={bodyChanged}
        />
      </div>
      <footer className="modal__footer">
        <Button primary text="Send" disabled={!subject || !body} onClick={send} />
        <Button text="Cancel" onClick={onCancel} />
      </footer>
    </Modal>
  )
}

Message.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
}

export default Message