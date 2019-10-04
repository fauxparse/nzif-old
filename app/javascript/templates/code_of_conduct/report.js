import React, { Fragment, useCallback, useState } from 'react'
import PropTypes from 'lib/proptypes'
import { useToggle } from 'lib/hooks'
import Button from 'atoms/button'
import Checkbox from 'atoms/checkbox'
import Divider from 'atoms/divider'
import Loader from 'atoms/loader'
import TextField from 'atoms/text_field'
import Modal from 'molecules/modal'

const Report = ({
  open,
  onCancel,
  onSend,
}) => {
  const [body, setBody] = useState('')

  const [anonymous, setAnonymous] = useState(false)

  const bodyChanged = useCallback(e => setBody(e.target.value), [setBody])

  const cancel = useCallback(() => {
    setBody('')
    setAnonymous(false)
    onCancel()
  }, [setBody, setAnonymous, onCancel])

  const [state, setState] = useState('composing')

  const send = useCallback(() => {
    setState('sending')
    onSend({ body, anonymous }).then(() => setState('sent'))
  }, [body, anonymous, onSend, setState])

  return (
    <Modal className="incident-report" isOpen={open} onRequestClose={cancel}>
      <header className="modal__header">
        <h2 className="modal__title">Report an incident</h2>
        <Button className="modal__close" icon="close" onClick={cancel} />
      </header>
      <div className="modal__body">
        {state === 'sent' ? (
          <div className="static-content">
            <p>
              Thank you for submitting your report. We’re sorry you’ve had a negative experience
              at the Festival, but we’re grateful for the opportunity to address what happened in
              a constructive way.
            </p>
            <h4>What happens now?</h4>
            <ol>
              <li>
                The Festival team will review your report, including
                checking for any other reports involving similar events,
                behaviour or people.
              </li>
              <li>
                We will contact the people involved to discuss next steps.
              </li>
              <li>
                If you have chosen to attach your name to the report,
                we will contact you directly to follow up.
              </li>
            </ol>
          </div>
        ) : (
          <Fragment>
            <p>
              Tell us in your own words what happened, where, and when. If you can, include who was
              involved, including anyone else who may have observed the incident. You don’t have to
              say why you feel this was a breach of the Code of Conduct: if anything at the Festival
              has made you feel uncomfortable, we’d love to hear about it so that we can improve the
              experience for you and for other participants.
            </p>
            <Divider />
            <TextField
              autoSize
              autoFocus
              multiline
              name={body}
              value={body}
              onChange={bodyChanged}
              disabled={state === 'sending'}
            />
            {state === 'sending' && <Loader />}
          </Fragment>
        )}
      </div>
      <footer className="modal__footer">
        {state === 'sent' ? (
          <Button
            primary
            text="Close"
            onClick={onCancel}
          />
        ) : (
          <Fragment>
            <Checkbox
              checked={anonymous}
              onChange={e => setAnonymous(e.target.checked)}
              disabled={state === 'sending'}
            >
              I’d like to stay anonymous
            </Checkbox>
            <Button
              primary
              text="Send report"
              disabled={state === 'sending' || !body.trim()}
              onClick={send}
            />
          </Fragment>
        )}
      </footer>
    </Modal>
  )
}

Report.propTypes = {
  open: PropTypes.bool,
  confirm: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
}

Report.defaultProps = {
  open: false,
  dontShow: false,
}

export default Report
