import React, { useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import omit from 'lodash/omit'
import { PITCHES_QUERY } from '../../queries'
import Breadcrumbs from '../shared/breadcrumbs'
import Loader from '../shared/loader'
import PitchForm from './form'

const PITCH_FRAGMENT = gql`
  fragment PitchFragment on Pitch {
    id
    festival {
      year
      startDate
      endDate
    }
    state
    name
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
    workshopDescription
    workshopRequirements
    participantCount
    taughtBefore
    otherInfo
    showDescription
    castSize
    performedBefore
    experience
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
  const savePitch = (attributes, newLocation) => new Promise((resolve, reject) => {
    Promise.all([
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
          if (!match.params.id) {
            proxy.writeQuery({
              query: PITCHES_QUERY,
              data: {
                pitches: [
                  updatePitch,
                  ...proxy.readQuery({ query: PITCHES_QUERY, variables: { year } }).pitches
                ],
              },
              variables: { year },
            })

            if (!newLocation.pathname.match(/pitches$/)) {
              newLocation.pathname = newLocation.pathname.replace(/[^/]+$/, id)
            }
          }
        },
        errorPolicy: 'all',
      }),
      new Promise(resolve => setTimeout(resolve, 1000)),
    ]).then(([{ errors = [] }]) => {
      if (errors.length) {
        setErrors(errors[0].detail || {})
        reject(errors)
      } else {
        setErrors({})
        resolve(newLocation)
      }
    })
  })

  const goBack = () => history.push(match.url.replace(/\/[^/]+$/, ''))

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
        <PitchForm
          pitch={pitch}
          errors={errors}
          onSave={savePitch}
          onClose={goBack}
        />
      )}
    </section>
  )
}

EditPitch.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
}

export default withRouter(EditPitch)
