import React from 'react'
import PropTypes from 'prop-types'
import { CountrySelect, Field, Label, Input } from '../form'
import Button from '../button'

const Presenter = ({ presenter, disabled, passwordRequired, onChange, onDelete }) => {
  const changed = (name, value) => {
    onChange({
      ...presenter,
      [name]: value,
    })
  }

  const fieldChanged = (e) => {
    const { name, value } = e.target
    changed(name, value)
  }

  const countryChanged = (country) => changed('country', country)

  const deleteClicked = (e) => {
    e.preventDefault()
    onDelete(presenter)
  }

  return (
    <div className="pitch__presenter">
      <Field>
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          value={presenter.name || ''}
          onChange={fieldChanged}
          required
          disabled={disabled}
          autoFocus
        />
      </Field>
      <Field>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={presenter.email || ''}
          onChange={fieldChanged}
          required
          disabled={disabled}
        />
      </Field>
      {passwordRequired && (
        <Field>
          <Label>Choose a password</Label>
          <Input
            type="password"
            name="password"
            value={presenter.password || ''}
            onChange={fieldChanged}
            required
          />
        </Field>
      )}
      <Field>
        <Label>City</Label>
        <Input
          type="text"
          name="city"
          value={presenter.city || ''}
          onChange={fieldChanged}
          required
        />
      </Field>
      <Field>
        <Label>Country</Label>
        <CountrySelect
          value={presenter.country || ''}
          onChange={countryChanged}
          required
        />
      </Field>
      {!disabled &&
        <Button
          className="pitch__delete-presenter"
          icon="close"
          onClick={deleteClicked}
          disabled={disabled}
        />
      }
    </div>
  )
}

Presenter.propTypes = ({
  presenter: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  passwordRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
})

export default Presenter
