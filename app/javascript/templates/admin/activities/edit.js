import React, { useCallback, useMemo, useState } from 'react'
import copy from 'copy-to-clipboard'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import pluralize from 'pluralize'
import Button from 'atoms/button'
import Loader from 'atoms/loader'
import Tab from 'atoms/tab'
import TextField from 'atoms/text_field'
import Breadcrumbs from 'molecules/breadcrumbs'
import TabBar from 'molecules/tab_bar'
import Header from 'organisms/header'
import Skeleton from 'effects/skeleton'
import Details from './details'
import Session from './session'

import './index.scss'

const Edit = ({
  loading,
  festival,
  activity,
  presenters,
  venues,
  tab,
  onTabChange,
  onChange,
  onSessionChange,
  onRollChange,
}) => {
  const root = useMemo(() => (
    `${window.location.origin}/${festival.year}/${pluralize(activity.type)}`
  ), [festival, activity])

  const [changes, setChanges] = useState({})

  const values = useMemo(() => ({ ...activity, ...changes }), [activity, changes])

  const changed = useCallback((e) => {
    const { name, value } = e.target
    setChanges({ ...changes, [name]: value })
  }, [changes, setChanges])

  const blurred = useCallback((e) => {
    const { name, value } = e.target
    if (value !== activity[name]) {
      onChange({ [name]: value })
    }
  }, [activity, onChange])

  const changeTab = useCallback(e => (
    onTabChange(e.target.closest('[data-tab]').dataset.tab)
  ), [onTabChange])

  const copyURL = useCallback(() => copy(`${root}/${values.slug}`), [root, values])

  const session = useMemo(() => activity.sessions.find(s => s.id === tab), [activity, tab])

  if (!festival || !festival.adminRoot) return <Loader />

  return (
    <div className="edit-activity">
      <Header>
        <Breadcrumbs back={`${festival.adminRoot}/activities`}>
          <Breadcrumbs.Link to={`${festival.adminRoot}/activities`}>Activities</Breadcrumbs.Link>
        </Breadcrumbs>
        {loading ? (
          <Skeleton loading className="header__title">{values.slug}</Skeleton>
        ) : (
          <TextField
            className="edit-activity__name header__title"
            name="name"
            autoSize
            multiline
            rows={1}
            value={values.name}
            disabled={loading || undefined}
            placeholder="Activity name"
            onChange={changed}
            onBlur={blurred}
          />
        )}
        <label className="slug edit-activity__slug">
          <span className="slug__root">{root}</span>
          <TextField
            autoSize
            autoSelect
            className="slug__input"
            name="slug"
            value={values.slug}
            disabled={loading || undefined}
            onChange={changed}
            onBlur={blurred}
          />
          <Button
            className="slug__copy"
            icon="copy"
            aria-label="Copy activity URL"
            onClick={copyURL}
          />
        </label>
        <TabBar>
          <Tab
            text="Details"
            selected={tab === 'details'}
            data-tab="details"
            onClick={changeTab}
          />
          {activity.sessions.map(session => (
            <Tab
              key={session.id}
              text={moment(session.startsAt).format('ddd D MMM')}
              selected={tab === session.id}
              data-tab={session.id}
              onClick={changeTab}
            />
          ))}
        </TabBar>
      </Header>
      {tab === 'details' ? (
        <Details
          activity={activity}
          presenters={presenters}
          onChange={onChange}
        />
      ) : (
        session && (
          <Session
            activity={activity}
            session={session}
            venues={venues}
            onChange={onSessionChange}
            onRollChange={onRollChange}
          />
        )
      )}
    </div>
  )
}

Edit.propTypes = {
  loading: PropTypes.bool,
  festival: PropTypes.festival,
  presenters: PropTypes.arrayOf(PropTypes.user.isRequired).isRequired,
  venues: PropTypes.arrayOf(PropTypes.venue.isRequired).isRequired,
  activity: PropTypes.activity.isRequired,
  tab: PropTypes.id.isRequired,
  onTabChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSessionChange: PropTypes.func.isRequired,
  onRollChange: PropTypes.func.isRequired,
}

Edit.defaultProps = {
  loading: false,
}

export default Edit
