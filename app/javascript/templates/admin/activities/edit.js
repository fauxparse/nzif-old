import React, { useCallback, useEffect, useMemo, useState } from 'react'
import copy from 'copy-to-clipboard'
import PropTypes from 'lib/proptypes'
import pluralize from 'pluralize'
import Button from 'atoms/button'
import Tab from 'atoms/tab'
import TextField from 'atoms/text_field'
import Breadcrumbs from 'molecules/breadcrumbs'
import TabBar from 'molecules/tab_bar'
import Header from 'organisms/header'
import Skeleton from 'effects/skeleton'
import Details from './details'

import './index.scss'

const Edit = ({
  loading,
  festival,
  activity,
  presenters,
  tab,
  onTabChange,
  onChange
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

  const changeTab = useCallback(e => onTabChange(e.target.dataset.tab), [onTabChange])

  const copyURL = useCallback(() => copy(`${root}/${values.slug}`), [root, values])

  return (
    <div className="edit-activity">
      <Header>
        <Breadcrumbs back="/">
          <Breadcrumbs.Link to="/">Activities</Breadcrumbs.Link>
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
        </TabBar>
      </Header>
      {tab === 'details' && (
        <Details
          activity={activity}
          presenters={presenters}
          onChange={onChange}
        />
      )}
    </div>
  )
}

Edit.propTypes = {
  loading: PropTypes.bool,
  festival: PropTypes.shape({
    year: PropTypes.id.isRequired,
  }),
  activity: PropTypes.activity.isRequired,
  tab: PropTypes.id.isRequired,
  onTabChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

Edit.defaultProps = {
  loading: false,
}

export default Edit
