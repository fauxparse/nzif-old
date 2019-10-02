import React, { useCallback, useEffect, useMemo } from 'react'
import { useLazyQuery, useMutation } from 'react-apollo'
import { useFestival } from 'contexts/festival'
import { useCurrentUser } from 'contexts/current_user'
import { notify } from 'molecules/toast'
import Template from 'templates/teaching'
import MY_WORKSHOPS from 'queries/my_workshops'
import SEND_MESSAGE from 'queries/mutations/send_message'

const Teaching = () => {
  const festival = useFestival()

  const user = useCurrentUser()

  const [fetchSessions, { loading, data }] = useLazyQuery(MY_WORKSHOPS)

  useEffect(() => {
    if (festival && user) {
      fetchSessions({ variables: { year: festival.year, presenterId: user.id } })
    }
  }, [festival, user, fetchSessions])

  const sessions = useMemo(() => (data ? data.sessions : []), [data])

  const [sendMessage] = useMutation(SEND_MESSAGE)

  const send = useCallback((message) => {
    sendMessage({
      variables: {
        messageableType: 'Session',
        messageableId: message.session.id,
        subject: message.subject,
        body: message.body,
      },
      update: (cache, { data: { createMessage } }) => {
        const variables = { year: festival.year, presenterId: user.id }
        const existing = cache.readQuery({ query: MY_WORKSHOPS, variables })
        cache.writeQuery({
          query: MY_WORKSHOPS,
          variables,
          data: {
            ...existing,
            sessions: existing.sessions.map(s => (s.id === message.session.id ? {
              ...s,
              messages: [...s.messages, createMessage],
            } : s)),
          }
        })
      }
    }).then(() => notify('Message sent!'))
  }, [sendMessage, festival, user])

  return (
    <Template
      loading={!festival || !user || loading || !data}
      sessions={sessions}
      onSendMessage={send}
    />
  )
}

export default Teaching