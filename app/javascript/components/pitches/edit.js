import React, { useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import omit from 'lodash/omit'
import Breadcrumbs from '../shared/breadcrumbs'
import Loader from '../shared/loader'
import noTransition from '../page_transition/none'
import PitchForm from './form'

const PITCH_FRAGMENT = gql`
  fragment PitchFragment on Pitch {
    id
    festival {
      year
      startDate
      endDate
    }
    presenters {
      id
      name
      email
      city
      country
    }
    company
    bio
    presentedBefore
    availability
    codeOfConduct
  }
`

const PITCH_QUERY = gql`
  query ($year: ID!, $id: ID) {
    pitch(year: $year, id: $id) {
      ...PitchFragment
    }
  }

  ${PITCH_FRAGMENT}
`

const UPDATE_PITCH_MUTATION = gql`
  mutation UpdatePitch($year: ID, $attributes: PitchAttributes!) {
    updatePitch(year: $year, attributes: $attributes) {
      ...PitchFragment
    }
  }

  ${PITCH_FRAGMENT}
`
const EditPitch = ({ match, history, className }) => {
  const { year, id } = match.params

  const { loading, data: { pitch = {} } = {} } = useQuery(PITCH_QUERY, {
    variables: { year, id }
  })

  const [errors, setErrors] = useState({})

  const save = useMutation(UPDATE_PITCH_MUTATION)
  const savePitch = (attributes) => new Promise((resolve, reject) => {
    save({
      variables: {
        attributes: omit(attributes, ['festival']),
      },
      update: (proxy, { data: { updatePitch } }) => {
        const { id } = updatePitch
        proxy.writeQuery({
          query: PITCH_QUERY,
          data: { pitch: updatePitch },
          variables: { year, id },
        })
        history.replace(match.url.replace(/[^/]+$/, id), { transition: noTransition })
      },
      errorPolicy: 'all',
    }).then(({ errors = [] }) => {
      if (errors.length) {
        setErrors(errors[0].detail || {})
        reject()
      } else {
        setErrors({})
        resolve()
      }
    })
  })

  return (
    <section className={classNames('public-page', 'edit-pitch', className)}>
      <header className="new-pitch__header">
        <Breadcrumbs
          className="new-pitch__breadcrumbs"
          back={`/${year}/pitches`}
        >
          <Breadcrumbs.Link to={`/${year}/pitches`}>Pitches</Breadcrumbs.Link>
        </Breadcrumbs>
        <h1 className="page-title">Pitch us your idea</h1>
      </header>

      {loading ? (
        <Loader />
      ) : (
        <PitchForm pitch={pitch} errors={errors} onSave={savePitch} />
      )}
    </section>
  )
}

EditPitch.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
}

export default withRouter(EditPitch)
