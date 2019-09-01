import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'lib/proptypes'
import { useToggle } from 'lib/hooks'
import Level from 'atoms/level'
import Divider from 'atoms/divider'
import Markdown from 'molecules/markdown'
import Modal from 'molecules/modal'
import AssociatedActivity from 'molecules/associated_activity'
import Header from 'organisms/header'

const WorkshopDetails = ({ session: sessionProp, onClose }) => {
  const [open, , show, hide] = useToggle(false)

  const [session, setSession] = useState()

  const activity = useMemo(() => session ? session.activity : {}, [session])

  const { presenters = [], description = '', levels = [], associated = [] } = activity

  useEffect(() => {
    if (sessionProp) {
      setSession(sessionProp)
      show()
    } else {
      hide()
    }
  }, [sessionProp, setSession, show, hide])

  return (
    <Modal
      isOpen={open}
      className="workshop-details"
      onRequestClose={onClose}
    >
      <Header colored className="workshop-details__header">
        <Header.Button icon="close" onClick={onClose} aria-label="Close workshop details" />
        <Header.Title>
          {activity.name}
        </Header.Title>
        <div className="activity-details__presenter-names">
          {presenters.map(presenter => (
            <div key={presenter.id} className="presenter-name">
              <span className="presenter-name__name">{presenter.name}</span>
              <span className="presenter-name__origin">{presenter.origin}</span>
            </div>
          ))}
        </div>
      </Header>
      <div className="modal__body">
        {levels.length > 0 && (
          <div className="workshop-details__levels">
            {levels.map(level => <Level key={level} level={level} />)}
          </div>
        )}
        <div className="workshop-details__description">
          <Markdown text={description} />
          {associated.map(associated_activity => (
            <AssociatedActivity key={associated_activity.id} activity={associated_activity} />
          ))}

          <Divider />

          {presenters.map(presenter => (
            <div className="workshop-details__presenter" key={presenter.id}>
              <h4 className="workshop-details__presenter-name">
                {presenter.name}
              </h4>
              <Markdown text={presenter.bio} />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

WorkshopDetails.propTypes = {
  session: PropTypes.session,
  onClose: PropTypes.func.isRequired,
}

WorkshopDetails.defaultProps = {
  session: null,
}

export default WorkshopDetails
