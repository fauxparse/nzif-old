import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { singular } from 'pluralize'
import { useQuery, useMutation } from 'react-apollo'
import { generatePath } from 'react-router'
import ACTIVITY from 'queries/activity'
import USERS from 'queries/users'
import UPDATE_ACTIVITY from 'queries/mutations/update_activity'
import { useFestival } from 'contexts/festival'
import Template from 'templates/admin/activities/edit'
import noTransition from 'components/page_transition/none'

const Edit = ({ match, history }) => {
  const { year, type: types, slug } = match.params

  const [tab, setTab] = useState('details')

  const festival = useFestival()

  const type = singular(types)

  const variables = { year, type, slug }

  const { loading, data } = useQuery(ACTIVITY, { variables })

  const { data: { users = [] } = {} } = useQuery(USERS)

  const [updateActivity] = useMutation(UPDATE_ACTIVITY, {
    update: (cache, { data: { updateActivity } }) => {
      const existing = cache.readQuery({ query: ACTIVITY, variables })
      cache.writeQuery({
        query: ACTIVITY,
        variables,
        data: {
          activity: {
            ...existing.activity,
            ...updateActivity,
          },
        },
      })
    },
  })

  const activity = useMemo(() => (loading ? {
    id: 0,
    name: slug,
    type,
    slug,
    presenters: [],
  } : data.activity), [loading, data, slug, type])

  const saveChanges = useCallback((attributes) => {
    updateActivity({
      variables: { id: activity.id, attributes }
    })
  }, [updateActivity, activity])

  useEffect(() => {
    if (!loading && data.activity.slug !== slug) {
      history.replace(
        generatePath(match.path, { year, type, slug: data.activity.slug }),
        { transition: noTransition },
      )
    }
  }, [history, loading, data, slug])

  return (
    <Template
      loading={loading}
      activity={activity}
      presenters={users}
      festival={festival}
      tab={tab}
      onChange={saveChanges}
      onTabChange={setTab}
    />
  )
}

export default Edit
