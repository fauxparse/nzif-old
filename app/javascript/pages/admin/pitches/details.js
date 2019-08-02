import React, { useContext, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery, useMutation } from 'react-apollo-hooks'
import pick from 'lodash/pick'
import FestivalContext from 'contexts/festival'
import Chip from 'molecules/chip'
import Breadcrumbs from 'molecules/breadcrumbs'
import Tags from 'molecules/tags'
import Header from 'organisms/header'
import PITCH_QUERY from 'queries/pitch'
import PITCHES_QUERY from 'queries/pitches'
import UPDATE_PITCH_MUTATION from 'queries/mutations/update_pitch'
import Answer from './answer'

const Details = ({ location, match, onLoad }) => {
  const { year, id } = match.params

  const festival = useContext(FestivalContext) || {
    year,
    adminRoot: `/admin/${year}`,
  }

  const { filters } = location.state || { filters: {} }

  const { loading, data } = useQuery(PITCH_QUERY, { variables: { year, id } })

  const loaded = useRef(false)

  useEffect(() => {
    if (!loaded.current &&!loading && data.pitch) {
      loaded.current = true
      if (onLoad) onLoad(data.pitch)
    }
  }, [loaded, loading, onLoad, data])

  const pitch = useMemo(() => {
    return (!loading && data.pitch) || { name: 'Pitch name', presenters: [] }
  }, [loading, data])

  const back = useMemo(() => ({
    pathname: `${festival.adminRoot}/pitches`,
    state: { filters },
  }), [festival, filters])

  const updatePitch = useMutation(UPDATE_PITCH_MUTATION, {
    update: (proxy, { data: { updatePitch } }) => {
      proxy.writeQuery({
        query: PITCH_QUERY,
        data: { pitch: updatePitch },
        variables: { year, id },
      })

      const pitches = proxy.readQuery(PITCHES_QUERY, { variables: { year } })
        .map(p => p.id === id ? { ...p, ...pick(updatePitch, Object.keys(p)) } : p)
      proxy.writeQuery({
        query: PITCHES_QUERY,
        data: { pitches },
        variables: { year },
      })
    },
    errorPolicy: 'all',
  })

  const saveChanges = (changes) => {
    const variables = { year, attributes: { id, ...changes } }
    updatePitch({ variables, optimisticResponse: { ...pitch, ...changes } })
  }

  const onPileChanged = ([pile]) => saveChanges({ pile })

  const onGenderChanged = ([gender]) => saveChanges({ gender })

  const onOriginChanged = ([origin]) => saveChanges({ origin })

  return (
    <div className="pitch-details">
      <Header>
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>Pitches</Breadcrumbs.Link>
        </Breadcrumbs>
        <Header.Title>{pitch.name}</Header.Title>
        <div className="pitch-details__presenters">
          {pitch.presenters.map(presenter => <Chip key={presenter.name} user={presenter} />)}
        </div>
        <div className="pitch-details__tags">
          <Tags
            exclusive
            tags={['Unsorted', 'No', 'Maybe', 'Yes']}
            selected={[pitch.pile].filter(Boolean)}
            onChange={onPileChanged}
          />
          <Tags
            exclusive
            tags={['Women', 'Men', 'Mixed']}
            selected={[pitch.gender].filter(Boolean)}
            onChange={onGenderChanged}
          />
          <Tags
            exclusive
            tags={['New Zealand', 'Australia', 'International']}
            selected={[pitch.origin].filter(Boolean)}
            onChange={onOriginChanged}
          />
        </div>
      </Header>

      <section className="pitch-details__section">
        <h2 className="section-title">Presenter details</h2>

        <Answer label="Company name" text={pitch.company} />
        <Answer label="Bio" text={pitch.bio} />
        <Answer label="Presented at NZIF before?" text={pitch.presentedBefore} />
      </section>
      {pitch.activityType === 'workshop' && (
        <section className="pitch-details__section">
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
        <section className="pitch-details__section">
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
        <section className="pitch-details__section">
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
        <section className="pitch-details__section">
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
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  onLoad: PropTypes.func,
}

export default Details
