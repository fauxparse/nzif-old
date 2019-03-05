import React from 'react'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Breadcrumbs from '../shared/breadcrumbs'
import Loader from '../shared/loader'
import PitchForm from './form'

const PITCH_CONTEXT_QUERY = gql`
  query PitchContext($year: ID!) {
    festival(year: $year) {
      year
      startDate
      endDate
    }

    currentUser {
      id
      name
      email
      city
      country
      bio
    }
  }
`

const NewPitch = ({ match, className }) => {
  const { year } = match.params

  return (
    <section className={classNames('public-page', 'new-pitch', className)}>
      <header className="new-pitch__header">
        <Breadcrumbs className="new-pitch__breadcrumbs" back={`/${year}/pitches`}>
          <Breadcrumbs.Link to={`/${year}/pitches`}>
            Pitches
          </Breadcrumbs.Link>
        </Breadcrumbs>
        <h1 className="page-title">Pitch us your idea</h1>
      </header>

      <Query query={PITCH_CONTEXT_QUERY} variables={{ year }}>
        {({ loading, data: { festival, currentUser: user } = {} }) => (
          loading ? <Loader /> : <PitchForm festival={festival} user={user} />
        )}
      </Query>
    </section>
  )
}

export default withRouter(NewPitch)
