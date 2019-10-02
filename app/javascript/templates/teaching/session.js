import React, { Fragment, useCallback, useMemo, useState } from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import deburr from 'lodash/deburr'
import sortBy from 'lodash/sortBy'
import moment from 'lib/moment'
import { useToggle } from 'lib/hooks'
import Button from 'atoms/button'
import Divider from 'atoms/divider'
import Time from 'atoms/time'
import Chip from 'molecules/chip'
import Accordion from 'molecules/accordion'
import Markdown from 'molecules/markdown'
import Message from './message'

const Session = ({ session, onSendMessage }) => {
  const startsAt = useMemo(() => moment(session.startsAt), [session])

  const endsAt = useMemo(() => moment(session.endsAt), [session])

  const participants = useMemo(() => (
    sortBy(session.placements.map(p => p.user), [u => deburr(u.name).toLowerCase()])
  ), [session])

  const [selectedMessage, setSelectedMessage] = useState()

  const [composing, , compose, hideCompose] = useToggle()

  const sendMessage = useCallback((attributes) => {
    onSendMessage({ session, ...attributes })
    hideCompose()
  }, [onSendMessage, hideCompose, session])

  const messages = useMemo(() => (
    sortBy([...session.messages], [m => m.createdAt]).reverse()
  ), [session])

  return (
    <div className="teaching__session">
      <div className="teaching__venue">
        <p>
          Your workshop is at {session.venue.name}, {session.venue.address},
          from <Time time={[startsAt, endsAt]} />.
        </p>
        <Button as={Link} to="/map" icon="venue" text="Venue map" />
      </div>
      <div className="teaching__participants">
        <h2 className="teaching__heading">
          {participants.length}/{session.capacity} participants
        </h2>

        <div className="participant-list">
          {participants.map(user => (
            <Chip
              key={user.id}
              user={user}
              className="participant"
            />
          ))}
        </div>

        {session.waitlist.length > 0 && (
          <p>There are {session.waitlist.length} people on the waitlist for this session.</p>
        )}
      </div>

      <div className="teaching__messages">
        <p>
          You can send a message to people registered for this session.
          They’ll be able to reply to you via email.
        </p>
        <Button primary icon="email" text="Send message" onClick={compose} />
        {messages.length > 0 && (
          <Fragment>
            <h2 className="teaching__heading">Messages</h2>
            <Accordion selected={selectedMessage} onChange={setSelectedMessage}>
              {messages.map(message => (
                <Accordion.Section
                  key={message.id}
                  name={message.id}
                  label={message.subject}
                  icon="email"
                >
                  <p>
                    <Time time={message.createdAt} format="full" />
                  </p>
                  <Divider accent />
                  <Markdown text={message.body} />
                </Accordion.Section>
              ))}
            </Accordion>
          </Fragment>
        )}

        <Message open={composing} onSend={sendMessage} onCancel={hideCompose} />
      </div>
    </div>
  )
}

Session.propTypes = {
  session: PropTypes.session,
  onSendMessage: PropTypes.func.isRequired,
}

export default Session