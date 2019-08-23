import React, { useCallback, useContext, useEffect, useReducer } from 'react'
import PropTypes from 'lib/proptypes'
import Hint from 'atoms/hint'
import TextLink from 'atoms/text_link'
import Icon from 'atoms/icon'
import LabelledField from 'molecules/labelled_field'
import { useRegistration } from 'contexts/registration'
import { useCurrentUser } from 'contexts/current_user'
import Heading from './heading'

const Details = ({ onChange }) => {
  const { registration, change, errors } = useRegistration()

  const currentUser = useCurrentUser()

  const changed = useCallback(({ target }) => change({ [target.name]: target.value }), [change])

  useEffect(() => onChange({ valid: true }), [registration, onChange])

  return (
    <section className="registration-form__section registration-form__details">
      <Heading>Your details</Heading>
      <LabelledField
        required
        name="name"
        value={registration.name || ''}
        onChange={changed}
        label="Your full name"
        autoFocus
        autoComplete="name"
        errors={errors}
      >
        <Icon name="user" />
        <Hint>
          Please use your actual name here: we need to be able to find you among 100+ improvisors!
        </Hint>
      </LabelledField>

      <LabelledField
        required
        name="email"
        value={registration.email || ''}
        onChange={changed}
        label="Your email address"
        autoComplete="email"
        errors={errors}
      >
        <Icon name="email" />
      </LabelledField>

      {!currentUser && (
        <>
          <div className="field-row">
            <LabelledField
              required
              type="password"
              name="password"
              value={registration.password || ''}
              onChange={changed}
              label="Password"
              errors={errors}
            >
              <Icon name="password" />
            </LabelledField>
            <Hint>
              Already have an account?
              {' '}
              <TextLink to="/login">Log in here</TextLink>
              {'.'}
            </Hint>
            <LabelledField
              required
              type="password"
              name="passwordConfirmation"
              value={registration.passwordConfirmation || ''}
              onChange={changed}
              label="Confirm password"
              errors={errors}
            >
              <Icon name="password" />
            </LabelledField>
          </div>
        </>
      )}

      <LabelledField
        type="phone"
        name="phone"
        value={registration.phone || ''}
        onChange={changed}
        label="New Zealand mobile number"
        autoComplete="tel"
      >
        <Icon name="phone" />
        <Hint>
          In case we need to get in touch with you in a hurry. This is optional, and
          if you don’t know it right now you can fill it in later.
        </Hint>
      </LabelledField>
    </section>
  )
}

Details.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default Details
