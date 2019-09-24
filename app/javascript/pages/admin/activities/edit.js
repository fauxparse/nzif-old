import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { singular } from 'pluralize'
import { useQuery, useMutation } from 'react-apollo'
import { generatePath } from 'react-router'
import sortBy from 'lodash/sortBy'
import ACTIVITY from 'queries/edit_activity'
import USERS from 'queries/users'
import VENUES from 'queries/venues'
import UPDATE_ACTIVITY from 'queries/mutations/update_activity'
import UPDATE_SESSION from 'queries/mutations/update_session'
import UPDATE_ROLL from 'queries/mutations/update_roll'
import { useFestival } from 'contexts/festival'
import Template from 'templates/admin/activities/edit'
import noTransition from 'components/page_transition/none'

const Edit = ({ match, history }) => {
  const { year, type: types, slug } = match.params

  const [tab, setTab] = useState(match.params.tab || 'details')

  const festival = useFestival()

  const type = singular(types).replace(/-/, '_')

  const variables = useMemo(() => ({ year, type, slug }), [year, type, slug])

  const { loading, data } = useQuery(ACTIVITY, { variables })

  const { data: { users = [] } = {} } = useQuery(USERS)

  const { data: { venues = [] } = {} } = useQuery(VENUES)

  const activity = useMemo(() => (loading ? {
    id: 0,
    name: slug,
    type,
    slug,
    presenters: [],
    sessions: [],
  } : data.activity), [loading, data, slug, type])

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

  const saveChanges = useCallback((attributes) => {
    updateActivity({
      variables: { id: activity.id, attributes }
    })
  }, [updateActivity, activity])

  const [updateSession] = useMutation(UPDATE_SESSION)

  const saveSessionChanges = useCallback((session, attributes) => {
    updateSession({
      variables: { id: session.id, attributes },
      update: (cache, { data: { updateSession } }) => {
        const { activity: existingActivity } = cache.readQuery({
          query: ACTIVITY,
          variables,
        })
        cache.writeQuery({
          query: ACTIVITY,
          variables,
          data: {
            activity: {
              ...existingActivity,
              sessions: existingActivity.sessions.map(s => (
                s.id === session.id ? { ...s, ...updateSession } : s
              )),
            },
          },
        })
      }
    })
  }, [updateSession, variables])

  const [updateRoll] = useMutation(UPDATE_ROLL)

  const saveRollChanges = useCallback((session, { placements, waitlist }) => {
    const placementIds = placements.map(p => p.id)
    const waitlistIds = waitlist.map(w => w.id)

    updateRoll({
      variables: { id: session.id, placements: placementIds, waitlist: waitlistIds },
      update: (cache, { data: { updateRoll } }) => {
        const existing = cache.readQuery({ query: ACTIVITY, variables })
        const updatedSession = {
          ...updateRoll,
          placements: sortBy(updateRoll.placements, [({ id }) => placementIds.indexOf(id)]),
        }
        cache.writeQuery({
          query: ACTIVITY,
          variables,
          data: {
            ...existing,
            activity: {
              ...existing.activity,
              sessions: existing.activity.sessions.map(s => (
                s.id === session.id ? { ...s, ...updatedSession } : s
              )),
            }
          }
        })
      }
    })
  }, [updateRoll, variables])

  useEffect(() => {
    if (!loading && data.activity.slug !== slug) {
      history.replace(
        generatePath(match.path, { year, type, slug: data.activity.slug, tab: 'details' }),
        { transition: noTransition },
      )
    }
  }, [history, match, loading, data, year, type, slug])

  useEffect(() => {
    if (tab !== match.params.tab) {
      history.replace(
        generatePath(match.path, { year, type, slug, tab }),
        { transition: noTransition },
      )
    }
  }, [history, match, tab, year, type, slug])

  return (
    <Template
      loading={loading}
      activity={activity}
      presenters={users}
      venues={venues}
      festival={festival}
      tab={tab}
      onChange={saveChanges}
      onSessionChange={saveSessionChanges}
      onRollChange={saveRollChanges}
      onTabChange={setTab}
    />
  )
}

export default Edit
