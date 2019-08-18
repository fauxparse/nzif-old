import React, { useCallback, useContext, useMemo, useReducer } from 'react'
import Hint from 'atoms/hint'
import TextLink from 'atoms/text_link'
import Icon from 'atoms/icon'
import LabelledField from 'molecules/labelled_field'
import RegistrationFormContext from './context'
import Heading from './heading'

const useUserDetails = (user) => {
  const [state, dispatch] = useReducer((state, { name, value }) => ({
    ...state,
    [name]: value,
  }), user)

  const changed =
    useCallback(({ target: { name, value } }) => dispatch({ name, value }), [dispatch])

  return [state, changed]
}

const Details = () => {
  const { user: currentUser } = useContext(RegistrationFormContext)

  const [user, changed] = useUserDetails(currentUser || {})

  return (
    <section className="registration-form__section registration-form__details">
      <Heading>Your details</Heading>
      <LabelledField
        required
        name="name"
        value={user.name || ''}
        onChange={changed}
        label="Your full name"
        autoFocus
        autoComplete="name"
      >
        <Icon name="user" />
        <Hint>
          Please use your actual name here: we need to be able to find you among 100+ improvisors!
        </Hint>
      </LabelledField>

      <LabelledField
        required
        name="email"
        value={user.email || ''}
        onChange={changed}
        label="Your email address"
        autoComplete="email"
        disabled={!!currentUser}
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
              value={user.password || ''}
              onChange={changed}
              label="Password"
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
              type="passwordConfirmation"
              name="password"
              value={user.passwordConfirmation || ''}
              onChange={changed}
              label="Confirm password"
            >
              <Icon name="password" />
            </LabelledField>
          </div>
        </>
      )}

      <LabelledField
        type="phone"
        name="phone"
        value={user.phone || ''}
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

export default Details
