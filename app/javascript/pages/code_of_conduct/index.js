import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import gql from 'graphql-tag'
import get from 'lodash/get'
import { useQuery } from 'react-apollo'
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

const CodeOfConduct = ({ match }) => {
  const { year } = match.params

  const { data } = useQuery(GET_ACCEPTED_AT, { variables: { year } })

  const { loading, raw, title, error } = useStaticContent('code-of-conduct')

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
    />
  )
}

CodeOfConduct.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default CodeOfConduct
