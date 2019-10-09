import React, { Fragment, useCallback, useContext, useMemo, useRef, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery, useMutation } from 'react-apollo-hooks'
import Button from 'atoms/button'
import Checkbox from 'atoms/checkbox'
import Loader from 'atoms/loader'
import Breadcrumbs from 'molecules/breadcrumbs'
import Header from 'organisms/header'
import FestivalContext from 'contexts/festival'
import PITCHES_QUERY from 'queries/pitches'
import PROMOTE_PITCH_MUTATION from 'queries/mutations/promote_pitch'

const Promote = ({ location }) => {
  const festival = useContext(FestivalContext)

  const { year } = festival

  const { filters, pitchIds = [] } = location.state || {}

  const back = useMemo(() => ({
    pathname: `${festival.adminRoot}/pitches`,
    state: { filters },
  }), [festival, filters])

  const [selected, setSelected] = useState(pitchIds)

  const checkboxChanged = useCallback((e) => {
    const { checked, value } = e.target
    setSelected(checked ? [...selected, value] : selected.filter(id => id !== value))
  }, [selected, setSelected])

  const [state, setState] = useState('ready')

  const { loading, data: { pitches: allPitches = [] } } =
    useQuery(PITCHES_QUERY, { variables: { year } })

  const pitches = useMemo(() => {
    const ids = state === 'ready' ? pitchIds : selected
    return allPitches.filter(p => ids.includes(p.id))
  }, [allPitches, selected, pitchIds, state])

  const promotePitch = useMutation(PROMOTE_PITCH_MUTATION)

  const wait = new Promise((resolve) => setTimeout(resolve, 3000))

  const finished = useRef({})

  const start = useCallback(() => {
    setState('running')
    finished.current = selected.reduce((h, id) => ({ ...h, [id]: false }), {})
    Promise
      .all([
        wait,
        ...selected.map(id => {
          promotePitch({ variables: { id } }).then(() => {
            finished.current[id] = true
          })
        })
      ])
      .then(() => setState('finished'))
  }, [setState, selected, promotePitch, finished, wait])

  return (
    <div>
      <Header>
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>Pitches</Breadcrumbs.Link>
        </Breadcrumbs>
        <Header.Title>Promote pitches</Header.Title>
        <Fragment>
          {state === 'finished' ? (
            <Button primary disabled text="Done!" />
          ) : (
            <Button
              primary
              disabled={loading || state === 'running' || !selected.length}
              text={state === 'running' ? (
                'Please wait…'
              ) : (
                `Promote ${selected.length} pitch${selected.length === 1 ? '' : 'es'}`
              )}
              onClick={start}
            />
          )}
        </Fragment>
      </Header>
      <div className="promote-pitches">
        {pitches && pitches.map(p => (
          <div key={p.id} className="promote-pitches__pitch">
            {state === 'ready' ? (
              <Checkbox
                checked={selected.includes(p.id)}
                name={`pitch_${p.id}`}
                value={p.id}
                onChange={checkboxChanged}
              />
            ) : finished.current[p.id] ? (
              <Checkbox checked disabled />
            ) : (
              <Loader />
            )}

            <span>{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

Promote.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
}

export default Promote
