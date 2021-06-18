import React, { useContext, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery, useMutation } from 'react-apollo-hooks'
import pick from 'lodash/pick'
import copy from 'copy-to-clipboard'
import sortBy from 'lodash/sortBy'
import moment from 'lib/moment'
import FestivalContext from 'contexts/festival'
import Date from 'atoms/date'
import Time from 'atoms/time'
import Chip from 'molecules/chip'
import Breadcrumbs from 'molecules/breadcrumbs'
import Tags from 'molecules/tags'
import Header from 'organisms/header'
import Ripple from 'effects/ripple'
import PITCH_QUERY from 'queries/pitch'
import PITCHES_QUERY from 'queries/pitches'
import UPDATE_PITCH_MUTATION from 'queries/mutations/update_pitch'
import Answer from './answer'

const Details = ({ location, match, anonymise = false, onLoad }) => {
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

  const availability = useMemo(() => {
    if (!pitch || !pitch.festival) return []
    return sortBy(
      pitch.festival.slots.filter(t => pitch.slots.includes(t.startsAt)).map(slot => {
        const startTime = moment(slot.startsAt)
        const endTime = moment(slot.endsAt)
        const repeats = endTime.diff(startTime, 'days') + 1
        return { ...slot, repeats }
      }),
      slot => slot.startsAt
    )
  }, [pitch])

  const copyEmail = (e) => {
    const chip = e.target.closest('[data-email]')
    if (chip) {
      const { email } = chip.dataset
      copy(email)
    }
  }

  return (
    <div className="pitch-details">
      <Header>
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>Pitches</Breadcrumbs.Link>
        </Breadcrumbs>
        <Header.Title>{pitch.name}</Header.Title>
        {!anonymise && (
          <div className="pitch-details__presenters">
            {pitch.presenters.map(presenter => (
              <Chip
                key={presenter.name}
                user={presenter}
                data-email={`${presenter.name} <${presenter.email}>`}
                onClick={copyEmail}
              >
                <Ripple />
              </Chip>
            ))}
          </div>
        )}
        <div className="pitch-details__tags">
          <Tags
            exclusive
            tags={['Unsorted', 'No', 'Maybe', 'Yes']}
            selected={[pitch.pile].filter(Boolean)}
            onChange={onPileChanged}
          />
          <Tags
            exclusive
            tags={['Women', 'Men', 'Gender diverse', 'Mixed']}
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

      {!anonymise && (
        <section className="pitch-details__section">
          <h2 className="section-title">Presenter details</h2>

          <Answer label="Company name" text={pitch.company} />
          <Answer label="Bio" text={pitch.bio} />
          <Answer label="Presented at NZIF before?" text={pitch.presentedBefore} />
        </section>
      )}
      {pitch.activityType === 'workshop' && (
        <section className="pitch-details__section">
          <h2 className="section-title">Standalone workshop</h2>

          <Answer label="Workshop name" text={pitch.name} />
          <Answer label="Workshop description" text={pitch.workshopDescription} />
          <Answer label="Why should this workshop be taught at NZIF?" text={pitch.workshopReason} />
          <Answer label="Workshop levels" text={(pitch.activityLevels || []).join(', ')} />
          <Answer label="Prerequisites" text={pitch.workshopRequirements} />
          <Answer label="Maximum participants" text={pitch.participantCount.toString()} />
          <Answer label="Taught before?" text={pitch.taughtBefore} />
          <Answer label="Tech requirements" text={pitch.workshopTech} />
          <Answer label="Accessibility" text={pitch.accessibility} />
          <Answer label="Other info" text={pitch.otherInfo} />
        </section>
      )}
      {pitch.activityType === 'directed' && (
        <section className="pitch-details__section">
          <h2 className="section-title">New work</h2>

          <Answer label="Show name" text={pitch.name} />
          <Answer label="Show description" text={pitch.showDescription} />
          <Answer label="Show details" text={pitch.showDetails} />
          <Answer label="Why should this show be at NZIF?" text={pitch.showWhy} />
          <Answer label="Cast size" text={pitch.castSize.toString()} />
          <Answer label="Performed before?" text={pitch.performedBefore} />
          <Answer label="Workshop description" text={pitch.workshopDescription} />
          <Answer label="Workshop size" text={pitch.participantCount.toString()} />
          <Answer label="Taught before?" text={pitch.taughtBefore} />
          <Answer label="Workshop requirements" text={pitch.workshopRequirements} />
          <Answer label="Workshop tech" text={pitch.workshopTech} />
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
      <section className="pitch-details__section">
        <h2 className="section-title">Availability</h2>
        {availability.length > 0 && (
          <ul className="pitch-details__slots">
            {availability.map(({ startsAt, endsAt, repeats }) => (
              <li key={startsAt} className="pitch-details__slot">
                <Date date={[startsAt, endsAt]} />
                {repeats > 1 && ` (${repeats} shows)`}
              </li>
            ))}
          </ul>
        )}
        <Answer label="Availability restrictions" text={pitch.availability} />
      </section>
    </div>
  )
}

Details.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  anonymise: PropTypes.bool,
  onLoad: PropTypes.func,
}

export default Details
