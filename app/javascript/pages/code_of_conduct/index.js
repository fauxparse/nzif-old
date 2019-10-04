import React, { useCallback } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import gql from 'graphql-tag'
import get from 'lodash/get'
import { useQuery, useMutation } from 'react-apollo'
import { useStaticContent } from 'contexts/static_content'
import NotFound from 'templates/not_found'
import Template from 'templates/code_of_conduct'

const GET_ACCEPTED_AT = gql`
  query getAcceptedAt($year: ID!) {
    registration(year: $year) {
      codeOfConductAcceptedAt
    }
  }
`

const SEND_REPORT = gql`
  mutation sendReport($year: ID!, $body: String!, $anonymous: Boolean) {
    createIncident(year: $year, body: $body, anonymous: $anonymous) {
      id
    }
  }
`

const CodeOfConduct = ({ match }) => {
  const { year } = match.params

  const { data } = useQuery(GET_ACCEPTED_AT, { variables: { year } })

  const { loading, raw, title, error } = useStaticContent('code-of-conduct')

  const [sendReportMutation] = useMutation(SEND_REPORT)

  const sendReport = useCallback((variables) => (
    sendReportMutation({ variables: { year, ...variables } })
  ), [sendReportMutation, year])

  if (!loading && error) {
    return <NotFound />
  }

  return (
    <Template
      loading={loading}
      year={year}
      title={title}
      raw={raw}
      acceptedAt={get(data, 'registration.codeOfConductAcceptedAt')}
      onSendReport={sendReport}
    />
  )
}

CodeOfConduct.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default CodeOfConduct
