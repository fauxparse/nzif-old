import React, { useCallback, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import Loader from 'atoms/loader'
import Survey from 'templates/surveys/survey'

const QUERY = gql`
  query loadFeedbackForm($sessionId: ID!) {
    currentUser {
      id
    }

    surveyResponse(sessionId: $sessionId) {
      id
    }

    session(id: $sessionId) {
      id
      startsAt
      endsAt

      activity {
        name
        description
        presenters {
          name
        }

        ...on Workshop {
          levels
        }
      }
    }
  }
`

const MUTATION = gql`
  mutation CreateSurveyResponse(
    $sessionId: ID!, 
    $expectations: Int,
    $difficulty: Int,
    $good: String,
    $bad: String,
    $testimonial: String
  ) {
    createSurveyResponse(
      sessionId: $sessionId,
      expectations: $expectations,
      difficulty: $difficulty,
      good: $good,
      bad: $bad,
      testimonial: $testimonial
    ) {
      id
    }
  }
`

const Feedback = ({ location, match }) => {
  const { id } = match.params

  const variables = { sessionId: id }

  const { loading, data } = useQuery(QUERY, { variables })

  const [create] = useMutation(MUTATION, {
    update: (cache, { data: { createSurveyResponse } }) => {
      const existing = cache.readQuery({ query: QUERY, variables })
      cache.writeQuery({
        query: QUERY,
        variables,
        data: {
          ...existing,
          surveyResponse: createSurveyResponse,
        },
      })
    },
  })

  const [sending, setSending] = useState(false)

  const send = useCallback((attributes) => {
    setSending(true)
    create({ variables: { sessionId: id, ...attributes } })
      .then(() => setSending(false))
  }, [create, setSending, id])

  if (loading) return <Loader />

  if (!data.currentUser) {
    return <Redirect to={{ pathname: '/login', state: { returnTo: location } }} />
  }

  return (
    <Survey
      session={data.session}
      sent={!!data.surveyResponse}
      sending={sending}
      onSend={send}
    />
  )
}

Feedback.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
}

export default Feedback
