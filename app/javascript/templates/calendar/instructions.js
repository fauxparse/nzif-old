import React, { Fragment, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'
import Button from 'atoms/button'
import TextLink from 'atoms/text_link'
import Accordion from 'molecules/accordion'
import Modal from 'molecules/modal'
import { notify } from 'molecules/toast'

const Instructions = ({ url, open, onClose }) => {
  const copyUrl = useCallback(() => {
    copy(url)
    notify('URL copied!')
  }, [url])

  const [page, setPage] = useState()

  return (
    <Modal
      isOpen={open}
      className="calendar__instructions"
      onRequestClose={onClose}
    >
      <header className="modal__header">
        <h2 className="modal__title">
          Your calendar
        </h2>
        <Button className="modal__close" icon="close" onClick={onClose} />
      </header>
      <div className="modal__body">
        {url ? (
          <Accordion selected={page} onChange={setPage}>
            <Accordion.Section name="google" label="Google Calendar (desktop)" icon="google">
              <ol>
                <li>Click “Copy URL” below</li>
                <li>Open Google Calendar</li>
                <li>
                  In the sidebar, under “other calendars”, click the <b>+</b> icon
                  and choose “From URL”
                </li>
                <li>Paste the URL into the text box and click “Add calendar”</li>
              </ol>
            </Accordion.Section>
            <Accordion.Section name="iphone" label="iPhone" icon="phone">
              <ol>
                <li>Click “Copy URL” below</li>
                <li>Open Settings on your iPhone and go to “Passwords &amp; Accounts”</li>
                <li>Tap “Add Account” and choose “Other”</li>
                <li>Tap “Add Subscribed Calendar”</li>
                <li>Paste the URL into the text box and click “Next”</li>
              </ol>
            </Accordion.Section>
            <Accordion.Section name="other" label="Other" icon="calendar">
              <p>
                Most calendar software should have an option to let you import an iCal
                (.ics) format file, or to subscribe to a calendar from a URL.
                The latter option is preferable because it will be automatically
                updated if events are added or changed.
              </p>
              <p>
                Simply choose between “download” or “copy URL” as appropriate, and
                follow the instructions in your software.
              </p>
              <p>
                If you can help us provide instructions for someone else using the
                same setup as you, that would be amazing!
              </p>
            </Accordion.Section>
          </Accordion>
        ) : (
          <p>
            If you’ve registered for the Festival,
            you can <TextLink to="/login">log in</TextLink> to see your personalised calendar,
            including instructions for adding the calendar to your phone so you never miss an event.
          </p>
        )}
      </div>
      <footer className="modal__footer">
        {url && (
          <Fragment>
            <Button icon="copy" text="Copy URL" onClick={copyUrl} />
            <Button
              as="a"
              href={url}
              icon="download"
              text="Download as file"
            />
          </Fragment>
        )}
      </footer>
    </Modal>
  )
}

Instructions.propTypes = {
  url: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Instructions
