import React, { useCallback, useReducer } from 'react'
import PropTypes from 'lib/proptypes'
import isObject from 'lodash/isObject'
import Tags from 'molecules/tags'
import { ACTIVITY_TYPES } from 'components/pitches/constants'

export const useFilters = (initial = {}) => {
  const [state, dispatch] = useReducer((state, action) => {
    return { ...state, ...action }
  }, {
    pile: [],
    gender: [],
    origin: [],
    type: [],
    ...initial
  })

  const setFilter = useCallback((name, value) => {
    dispatch(isObject(name) ? name : { [name]: value })
  }, [dispatch])

  return [state, setFilter]
}

const Filters = ({ filters, onChange }) => {
  const { pile, gender, origin, type } = filters

  const onPileChanged = useCallback((pile) => onChange('pile', pile), [onChange])

  const onGenderChanged = useCallback((gender) => onChange('gender', gender), [onChange])

  const onOriginChanged = useCallback((origin) => onChange('origin', origin), [onChange])

  const onTypeChanged = useCallback((type) => (
    onChange('type', ACTIVITY_TYPES.filter(t => type.includes(t.title)).map(t => t.name))
  ), [onChange])

  return (
    <div className="pitches__filters">
      <Tags
        tags={['Unsorted', 'No', 'Maybe', 'Yes']}
        selected={pile}
        onChange={onPileChanged}
      />
      <Tags
        tags={['Women', 'Men', 'Mixed']}
        selected={gender}
        onChange={onGenderChanged}
      />
      <Tags
        tags={['New Zealand', 'Australia', 'International']}
        selected={origin}
        onChange={onOriginChanged}
      />
      <Tags
        tags={ACTIVITY_TYPES.map(type => type.title)}
        selected={ACTIVITY_TYPES.filter(t => type.includes(t.name)).map(t => t.title)}
        onChange={onTypeChanged}
      />
    </div>
  )
}

Filters.propTypes = {
  filters: PropTypes.shape({
    pile: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    gender: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    origin: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    type: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }),
  onChange: PropTypes.func.isRequired,
}

export default Filters
