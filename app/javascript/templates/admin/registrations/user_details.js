import React, { useCallback, useMemo, useReducer } from 'react'
import isEqual from 'lodash/isEqual'
import PropTypes from 'lib/proptypes'
import Icon from 'atoms/icon'
import LabelledField from 'molecules/labelled_field'

const useChanges = (initial = {}) => {
  const [state, dispatch] = useReducer((state, { reset, name, value }) => (
    reset ? {} : { ...state, [name]: value }
  ), initial)

  const changed = useCallback(({ target }) => dispatch(target), [dispatch])

  const reset = useCallback(() => dispatch({ reset: true }), [dispatch])

  return [state, changed, reset]
}

const UserDetails = ({ registration, errors, onChange }) => {
  const [changes, changed, reset] = useChanges()

  const details = useMemo(() => ({
    ...registration,
    ...changes,
  }), [registration, changes])

  const save = useCallback(() => {
    if (!isEqual(registration, details)) {
      if (onChange) {
        onChange(changes)
      }
      reset()
    }
  }, [registration, details, changes, reset, onChange])

  return (
    <div className="registration-details__user">
      <LabelledField
        required
        name="name"
        value={details.name || ''}
        onChange={changed}
        onBlur={save}
        label="Name"
        autoComplete="off"
        errors={errors}
      >
        <Icon name="user" />
      </LabelledField>

      <LabelledField
        required
        name="email"
        value={details.email || ''}
        onChange={changed}
        onBlur={save}
        label="Email address"
        autoComplete="off"
        errors={errors}
      >
        <Icon name="email" />
      </LabelledField>

      <LabelledField
        type="phone"
        name="phone"
        value={details.phone || ''}
        onChange={changed}
        onBlur={save}
        label="New Zealand mobile number"
        autoComplete="off"
      >
        <Icon name="phone" />
      </LabelledField>
    </div>
  )
}

UserDetails.propTypes = {
  registration: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default UserDetails
