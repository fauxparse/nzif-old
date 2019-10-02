import React, { useEffect, useMemo, useState, useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import Helmet from 'react-helmet'
import Date from 'atoms/date'
import Loader from 'atoms/loader'
import Tab from 'atoms/tab'
import TabBar from 'molecules/tab_bar'
import Header from 'organisms/header'
import Session from './session'

import './index.scss'

const Teaching = ({ loading, sessions, onSendMessage }) => {
  const [tab, setTab] = useState()

  useEffect(() => {
    if (sessions.length && !tab) {
      setTab(sessions[0].id)
    }
  }, [tab, setTab, sessions])

  const changeTab = useCallback(e => (
    setTab(e.target.closest('[data-tab]').dataset.tab)
  ), [setTab])

  const selectedSession = useMemo(() => sessions.find(s => s.id === tab), [sessions, tab])

  return (
    <section className="teaching">
      <Helmet>
        <title>Your workshops</title>
      </Helmet>
      <Header>
        <Header.Title>
          Your workshops
        </Header.Title>
        <TabBar>
          {sessions.map(session => (
            <Tab
              key={session.id}
              text={session.activity.name}
              selected={tab === session.id}
              data-tab={session.id}
              onClick={changeTab}
            >
              <span className="tab__text tab__text--secondary">
                <Date date={session.startsAt} />
              </span>
            </Tab>
          ))}
        </TabBar>
      </Header>
      <div className="teaching__body">
        {loading
          ? <Loader />
          : (
            sessions.length ? (
              selectedSession && <Session session={selectedSession} onSendMessage={onSendMessage} />
            ) : (
              <div className="teaching__nothing">
                <p>You don’t appear to be teaching any workshops, sorry!</p>
              </div>
            )
          )
        }
      </div>
    </section>
  )
}

Teaching.propTypes = {
  loading: PropTypes.bool,
  sessions: PropTypes.arrayOf(PropTypes.session.isRequired),
  onSendMessage: PropTypes.func.isRequired,
}

Teaching.defaultProps = {
  loading: false,
  sessions: [],
}

export default Teaching