import React, { useCallback, useMemo, useState } from 'react'
import copy from 'copy-to-clipboard'
import PropTypes from 'lib/proptypes'
import pluralize from 'pluralize'
import Button from 'atoms/button'
import Tab from 'atoms/tab'
import TextField from 'atoms/text_field'
import Breadcrumbs from 'molecules/breadcrumbs'
import TabBar from 'molecules/tab_bar'
import Header from 'organisms/header'

import './index.scss'

const Edit = ({ festival, activity }) => {
  const [sessionId, setSessionId] = useState()

  const [name, setName] = useState(activity.name)

  const [slug, setSlug] = useState(activity.slug)

  const nameChanged = useCallback(e => setName(e.target.value), [setName])

  const slugChanged = useCallback(e => setSlug(e.target.value), [setSlug])

  const root = useMemo(() => (
    `${window.location.origin}/${festival.year}/${pluralize(activity.type)}`
  ), [festival, activity])

  const copyURL = useCallback(() => copy(`${root}/${slug}`), [root, slug])

  return (
    <div className="edit-activity">
      <Header>
        <Breadcrumbs back="/">
          <Breadcrumbs.Link to="/">Activities</Breadcrumbs.Link>
        </Breadcrumbs>
        <TextField
          className="edit-activity__name header__title"
          autosize
          multiline
          rows={1}
          value={name}
          placeholder="Activity name"
          onChange={nameChanged}
        />
        <div className="slug edit-activity__slug">
          <span className="slug__root">{root}</span>
          <TextField
            autosize
            className="slug__input"
            value={slug}
            onChange={slugChanged}
          />
          <Button
            className="slug__copy"
            icon="copy"
            aria-label="Copy activity URL"
            onClick={copyURL}
          />
        </div>
        <TabBar>
          <Tab
            text="Details"
            selected={!sessionId}
          />
        </TabBar>
      </Header>
    </div>
  )
}

Edit.propTypes = {
  festival: PropTypes.shape({
    year: PropTypes.id.isRequired,
  }),
  activity: PropTypes.activity.isRequired,
}

export default Edit
