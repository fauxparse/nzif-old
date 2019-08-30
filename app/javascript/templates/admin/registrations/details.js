import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'lib/proptypes'
import humanize from 'lib/humanize'
import Avatar from 'atoms/avatar'
import Date from 'atoms/date'
import Loader from 'atoms/loader'
import Tab from 'atoms/tab'
import Tag from 'atoms/tag'
import TabBar from 'molecules/tab_bar'
import Breadcrumbs from 'molecules/breadcrumbs'
import Header from 'organisms/header'
import Skeleton from 'effects/skeleton'
import UserDetails from './user_details'
import Preferences from './preferences'

import './index.scss'

const Details = ({ loading, festival, sessions, registration }) => {
  const back = `/admin/${festival.year}/registrations`

  const { user, state, completedAt, preferences } = registration

  const errors = {}

  const [userChanges, setUserChanges] = useState({})

  const userDetails = useMemo(() => ({ ...user, ...userChanges }), [user, userChanges])

  const userDetailsChanged = useCallback((changes) => (
    setUserChanges({ ...userChanges, ...changes })
  ), [userChanges, setUserChanges])

  const [tab, setTab] = useState('preferences')

  return (
    <section className="registration-details">
      <Header>
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>{festival.year} registrations</Breadcrumbs.Link>
        </Breadcrumbs>
        <Skeleton loading={loading}>
          <Avatar className="registration-details__avatar" {...user} />
        </Skeleton>
        <Header.Title>
          <Skeleton loading={loading}>{user ? user.name : 'Participant name'}</Skeleton>
        </Header.Title>
        <Skeleton as="div" className="registration-details__state" loading={loading}>
          <Tag data-state={state}>{humanize(state || 'pending')}</Tag>
          {completedAt && <Date date={completedAt} />}
        </Skeleton>
        <TabBar>
          <Tab
            text="Details"
            selected={tab === 'details'}
            onClick={() => setTab('details')}
          />
          <Tab
            text="Preferences"
            selected={tab === 'preferences'}
            onClick={() => setTab('preferences')}
          />
        </TabBar>
      </Header>

      <div className="registration-details__body">
        {loading ? <Loader /> : (
          <>
            {tab === 'details' && (
              <UserDetails user={userDetails} errors={errors} onChange={userDetailsChanged} />
            )}
            {tab === 'preferences' && (
              <Preferences sessions={sessions} preferences={registration.preferences} />
            )}
          </>
        )}
      </div>
    </section>
  )
}

Details.propTypes = {
  loading: PropTypes.bool,
  festival: PropTypes.festival.isRequired,
  registration: PropTypes.shape({
    id: PropTypes.id,
    user: PropTypes.user,
  }),
}

Details.defaultProps = {
  loading: false,
  registration: {},
}

export default Details
