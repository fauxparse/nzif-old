import React, { useMemo, useState } from 'react'
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
import Availability from './availability'
import Payments from './payments'

import './index.scss'

const Details = ({
  loading,
  festival,
  sessions,
  allInShows,
  registration,
  onChange,
  onPaymentChanged,
}) => {
  const back = `/admin/${festival.year}/registrations`

  const { user, state, completedAt, preferences, availability } = registration

  const errors = {}

  const [tab, setTab] = useState('details')

  const avatar = useMemo(() => ({
    ...registration.user,
    name: registration.name,
  }), [registration])

  return (
    <section className="registration-details">
      <Header>
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>{festival.year} registrations</Breadcrumbs.Link>
        </Breadcrumbs>
        <Skeleton loading={loading}>
          <Avatar className="registration-details__avatar" {...avatar} />
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
          <Tab
            text="Availability"
            selected={tab === 'availability'}
            onClick={() => setTab('availability')}
          />
          <Tab
            text="Payment"
            selected={tab === 'payments'}
            onClick={() => setTab('payments')}
          />
        </TabBar>
      </Header>

      <div className="registration-details__body">
        {loading ? <Loader /> : (
          <>
            {tab === 'details' && (
              <UserDetails
                registration={registration}
                errors={errors}
                onChange={onChange}
              />
            )}
            {tab === 'preferences' && (
              <Preferences
                sessions={sessions}
                preferences={preferences}
                onChange={onChange}
              />
            )}
            {tab === 'availability' && (
              <Availability
                allInShows={allInShows}
                availability={availability}
                onChange={onChange}
              />
            )}
            {tab === 'payments' && (
              <Payments
                earlybird={festival.state === 'earlybird'}
                registration={registration}
                payments={registration.payments}
                onChange={onPaymentChanged}
              />
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
  registration: PropTypes.registration,
  sessions: PropTypes.arrayOf(PropTypes.session.isRequired),
  allInShows: PropTypes.arrayOf(PropTypes.session.isRequired),
  onChange: PropTypes.func,
  onPaymentChanged: PropTypes.func,
}

Details.defaultProps = {
  loading: false,
  registration: {},
  sessions: [],
  onChange: () => {},
  onPaymentChanged: () => {},
}

export default Details
