import React, { useEffect, useMemo, useState } from 'react'
import { Picture } from 'react-responsive-picture'
import { useToggle } from 'lib/hooks'
import Level from 'atoms/level'
import Markdown from 'molecules/markdown'
import Modal from 'molecules/modal'
import Header from 'organisms/header'
import Duotone from 'effects/duotone'

const WorkshopDetails = ({ session: sessionProp, onClose }) => {
  const [open, , show, hide] = useToggle(false)

  const [session, setSession] = useState()

  const activity = useMemo(() => session ? session.activity : {}, [session])

  const { presenters = [], description = '', levels = [] } = activity

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
        <Header.Button icon="close" onClick={onClose} />
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
        <Markdown className="workshop-details__description" text={description} />
      </div>
    </Modal>
  )
}

export default WorkshopDetails
