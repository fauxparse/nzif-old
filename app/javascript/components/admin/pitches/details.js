import React, { useCallback, useEffect, useReducer, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery, useMutation } from 'react-apollo-hooks'
import debounce from 'lodash/debounce'
import omit from 'lodash/omit'
import Breadcrumbs from '../../shared/breadcrumbs'
import Loader from '../../shared/loader'
import Avatar from '../../shared/avatar'
import EditableTitle from '../../shared/editable_title'
import Tags from './tags'
import Answer from './answer'
import PITCH_QUERY, { UPDATE_PITCH_MUTATION } from '../../../queries/pitch'
import PITCHES_QUERY from '../../../queries/pitches'

const Details = ({ match }) => {
  const { year, id } = match.params

  const back = match.url.replace(/\/[^/]+\/?$/, '')

  const { loading, data = {} } = useQuery(PITCH_QUERY, {
    variables: { year, id }
  })

  const reducer = (state, { type, ...action }) => {
    switch(type) {
      case 'loaded':
        return { ...action.pitch, dirty: false }
      case 'update':
        return { ...state, [action.name]: action.value, dirty: true }
      case 'saved':
        return { ...state, dirty: false }
      default:
        return state
    }
  }

  const [pitch, dispatch] = useReducer(reducer, {})

  useEffect(() => {
    if (data.pitch) dispatch({ type: 'loaded', pitch: data.pitch })
  }, [data])

  const changed = useCallback(e => dispatch({
    type: 'update',
    name: e.target.name,
    value: e.target.value,
  }), [dispatch])

  const tagChanged = (name, value) => dispatch({ type: 'update', name, value })

  const save = useMutation(UPDATE_PITCH_MUTATION, {
    variables: {
      attributes: omit(pitch, ['festival', 'dirty']),
    },
    update: (proxy, { data: { updatePitch } }) => {
      proxy.writeQuery({
        query: PITCH_QUERY,
        data: { pitch: updatePitch },
        variables: { year, id },
      })
    },
    refetchQueries: [{
      query: PITCHES_QUERY,
      variables: { year },
    }],
    errorPolicy: 'all',
  })

  const autosave = debounce(() => {
    if (pitch.dirty) {
      save().then(({ errors = [] }) => {
        if (!errors.length) {
          dispatch({ type: 'saved' })
        }
      })
    }
  }, 5000, { leading: true, trailing: true })

  useEffect(autosave, [pitch])

  return loading ? <Loader /> : (
    <div className="pitch__details">
      <header>
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>Pitches</Breadcrumbs.Link>
        </Breadcrumbs>
        <EditableTitle
          live
          name="name"
          value={pitch.name}
          onChange={changed}
          placeholder="Title"
        />
        <div className="presenters">
          {pitch.presenters && pitch.presenters.map(presenter => (
            <div key={presenter.id} className="presenter">
              <Avatar name={presenter.name} image={presenter.image} />
              <span className="presenter__name">{presenter.name}</span>
            </div>
          ))}
        </div>
        <div className="pitch__tags">
          <Tags
            tags={['Unsorted', 'No', 'Maybe', 'Yes']}
            selected={[pitch.pile || 'Unsorted']}
            onSelect={tag => tagChanged('pile', tag === 'Unsorted' ? null : tag)}
          />
          <Tags
            tags={['Women', 'Men', 'Mixed']}
            selected={pitch.gender ? [pitch.gender] : []}
            onSelect={tag => tagChanged('gender', tag)}
          />
          <Tags
            tags={['New Zealand', 'Australia', 'International']}
            selected={pitch.origin ? [pitch.origin] : []}
            onSelect={tag => tagChanged('origin', tag)}
          />
        </div>
      </header>
      <section>
        <h2 className="section-title">Presenter details</h2>

        <Answer label="Company name" text={pitch.company} />
        <Answer label="Bio" text={pitch.bio} />
        <Answer label="Presented at NZIF before?" text={pitch.presentedBefore} />
      </section>
      {pitch.activityType === 'workshop' && (
        <section>
          <h2 className="section-title">Standalone workshop</h2>

          <Answer label="Workshop name" text={pitch.name} />
          <Answer label="Workshop description" text={pitch.workshopDescription} />
          <Answer label="Workshop levels" text={(pitch.activityLevels || []).join(', ')} />
          <Answer label="Prerequisites" text={pitch.workshopRequirements} />
          <Answer label="Maximum participants" text={pitch.participantCount.toString()} />
          <Answer label="Taught before?" text={pitch.taughtBefore} />
          <Answer label="Available for teens?" text={pitch.teens ? 'Yes' : 'No'} />
          <Answer label="Accessibility" text={pitch.accessibility} />
          <Answer label="Other info" text={pitch.otherInfo} />
        </section>
      )}
      {pitch.activityType === 'directed' && (
        <section>
          <h2 className="section-title">New work</h2>

          <Answer label="Show name" text={pitch.name} />
          <Answer label="Show description" text={pitch.showDescription} />
          <Answer label="Cast size" text={pitch.castSize.toString()} />
          <Answer label="Performed before?" text={pitch.performedBefore} />
          <Answer label="Workshop description" text={pitch.workshopDescription} />
          <Answer label="Taught before?" text={pitch.taughtBefore} />
          <Answer label="Accessibility" text={pitch.accessibility} />
          <Answer label="Other info" text={pitch.otherInfo} />
        </section>
      )}
      {pitch.activityType === 'season' && (
        <section>
          <h2 className="section-title">Mini season</h2>

          <Answer label="Show name" text={pitch.name} />
          <Answer label="Show description" text={pitch.showDescription} />
          <Answer label="Cast details" text={pitch.castDetails} />
          <Answer label="Accommodation required?" text={pitch.castRequirements} />
          <Answer label="Accessibility" text={pitch.accessibility} />
          <Answer label="Other info" text={pitch.otherInfo} />
        </section>
      )}
      {pitch.activityType === 'young' && (
        <section>
          <h2 className="section-title">Improv for young audiences</h2>

          <Answer label="Show name" text={pitch.name} />
          <Answer label="Show description" text={pitch.showDescription} />
          <Answer label="Casting" text={pitch.casting} />
          <Answer label="Cast details" text={pitch.castDetails} />
          <Answer label="Accommodation required?" text={pitch.castRequirements} />
          <Answer label="Workshop description" text={pitch.workshopDescription} />
          <Answer label="Taught before?" text={pitch.taughtBefore} />
          <Answer label="Accessibility" text={pitch.accessibility} />
          <Answer label="Other info" text={pitch.otherInfo} />
        </section>
      )}
    </div>
  )
}

Details.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Details
