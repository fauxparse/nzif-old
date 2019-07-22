import React, { useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { useQuery, useMutation } from 'react-apollo-hooks'
import omit from 'lodash/omit'
import { PITCHES_QUERY } from '../../queries'
import { PITCH_QUERY, UPDATE_PITCH_MUTATION } from '../../queries/pitch'
import Breadcrumbs from '../shared/breadcrumbs'
import Loader from 'atoms/loader'
import PitchForm from './form'

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
          if (!match.params.id && !newLocation.pathname.match(/pitches$/)) {
            newLocation.pathname = newLocation.pathname.replace(/[^/]+$/, id)
          }
        },
        refetchQueries: [{
          query: PITCHES_QUERY,
          variables: { year },
        }],
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
