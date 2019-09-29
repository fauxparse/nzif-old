import React, { Fragment, useState, useEffect, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import pluralize from 'pluralize'
import humanize from 'lib/humanize'
import { Link } from 'react-router-dom'
import Button from 'atoms/button'
import Time from 'atoms/time'
import Date from 'atoms/date'
import List from 'molecules/list'
import Modal from 'molecules/modal'

const Details = ({ session: sessionProp, onClose }) => {
  const [session, setSession] = useState(sessionProp)

  useEffect(() => {
    if (sessionProp) setSession(sessionProp)
  }, [sessionProp, setSession])

  const selected = useMemo(() => {
    if (session) {
      const activity = session.activities.find(a => a.selected)
      return activity ? [activity] : session.activities
    }
  }, [session])

  return (
    <Modal
      className="session-details"
      isOpen={!!sessionProp}
      onRequestClose={onClose}
    >
      {session && (
        <Fragment>
          <header className="modal__header">
            <h2 className="modal__title">
              {selected.length > 1 ? pluralize(humanize(session.type)) : selected[0].name}
              {selected.length <= 1 && <small>{humanize(session.type)}</small>}
            </h2>
            <Button className="modal__close" icon="close" onClick={onClose} />
          </header>
          <div className="modal__body">
            <div className="session-details__time">
              <Time time={[session.startsAt, session.endsAt]} />
              {', '}
              <Date date={[session.startsAt]} />
            </div>
            <div className="session-details__venue">
              {selected.length > 1
                ? 'Various locations'
                : (
                  selected[0].venue
                    ? `${selected[0].venue.name}, ${selected[0].venue.address}`
                    : 'Location TBC'
              )}
            </div>
            {selected.length > 1 && (
              <List>
                {selected.map(s => (
                  <List.Item
                    as={Link}
                    to={s.url}
                    key={s.id}
                    icon={session.type}
                    primary={s.name}
                  />
                ))}
              </List>

            )}
          </div>
          <footer className="modal__footer">
            {selected.length === 1 && (
              <Button
                as={Link}
                to={selected[0].url}
                text="More details"
              />
            )}
          </footer>
        </Fragment>
      )}
    </Modal>
  )
}

Details.propTypes = {
  session: PropTypes.session,
  onClose: PropTypes.func.isRequired,
}

Details.defaultProps = {
  session: null,
}

export default Details
