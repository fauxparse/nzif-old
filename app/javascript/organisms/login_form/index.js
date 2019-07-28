import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import Button from 'atoms/button'
import Hint from 'atoms/hint'
import Loader from 'atoms/loader'
import SocialLoginButton, { PLATFORMS } from 'atoms/social_login_button'
import TextLink from 'atoms/text_link'
import LabelledField from 'molecules/labelled_field'
import { slideLeft, slideRight } from 'components/page_transition'

import './index.scss'

const STRINGS = {
  login: {
    title: 'Kia ora.',
    message: 'Please log in to continue.',
    button: 'Log in',
    errorMessage: 'Uh-oh. Please check the errors below.',
  },
  signup: {
    title: 'Haere mai.',
    message: 'Let’s get you all set up.',
    button: 'Sign up',
    errorMessage: 'Uh-oh. Please check the errors below.',
  }
}

const LoginForm = ({
  className,
  mode,
  name,
  email,
  password,
  passwordConfirmation,
  errors,
  loading,
  returnTo,
  onNameChanged,
  onEmailChanged,
  onPasswordChanged,
  onPasswordConfirmationChanged,
  onSubmit,
  ...props
}) => {
  const container = useRef()

  const nameChanged = useCallback((e) => onNameChanged(e.target.value), [onNameChanged])

  const emailChanged = useCallback((e) => onEmailChanged(e.target.value), [onEmailChanged])

  const passwordChanged = useCallback((e) => onPasswordChanged(e.target.value), [onPasswordChanged])

  const passwordConfirmationChanged = useCallback((e) => {
    onPasswordConfirmationChanged(e.target.value)
  }, [onPasswordConfirmationChanged])

  useEffect(() => {
    if (container.current) {
      const input = container.current.querySelector('input')
      if (input) input.focus()
    }
  }, [container])

  const submit = useCallback((e) => {
    e.preventDefault()

    const variables = mode === 'signup' ? {
      name,
      email,
      password,
      passwordConfirmation,
    } : {
      email,
      password,
    }

    onSubmit(variables)
  }, [mode, name, email, password, passwordConfirmation, onSubmit])

  const { title, message, button, errorMessage } = STRINGS[mode]

  return (
    <form
      ref={container}
      className={classNames('login-form', `login-form--${mode}`, className)}
      onSubmit={submit}
      {...props}
    >
      <fieldset
        className="popover__wrapper"
        disabled={loading || undefined}
        aria-busy={loading || undefined}
      >
        <h2 className="login-form__title">{title}</h2>
        <p className="login-form__message">
          {isEmpty(errors) ? message : errorMessage}
        </p>

        {mode === 'signup' && (
          <LabelledField
            label="Name"
            name="name"
            id={`${mode}__name`}
            required
            value={name}
            autoComplete={name}
            errors={errors}
            onChange={nameChanged}
          />
        )}

        <LabelledField
          label="Email address"
          name="email"
          type="email"
          id={`${mode}__email`}
          required
          value={email}
          autoComplete="username email"
          errors={errors}
          onChange={emailChanged}
        />

        <LabelledField
          label="Password"
          name="password"
          type="password"
          id={`${mode}__password`}
          required
          value={password}
          autoComplete="current-password"
          errors={errors}
          onChange={passwordChanged}
        >
          {mode === 'login' && (
            <Hint>
              <TextLink
                to={{ pathname: 'password/forgot', state: { transition: slideRight } }}
                replace
              >
                Forgot your password?
              </TextLink>
            </Hint>
          )}
        </LabelledField>

        {mode === 'signup' && (
          <LabelledField
            label="Confirm password"
            name="passwordConfirmation"
            type="password"
            id={`${mode}__password-confirmation`}
            required
            value={passwordConfirmation}
            errors={errors}
            onChange={passwordConfirmationChanged}
          />
        )}

        <div className="login-form__buttons">
          <Button
            className="login-form__submit"
            primary
            type="submit"
            text={button}
          />
          {PLATFORMS.map(platform => (
            <SocialLoginButton key={platform} platform={platform} returnTo={returnTo} />
          ))}
        </div>

        {mode === 'signup' ? (
          <p>
            Already signed up?{' '}
            <TextLink to={{ pathname: 'login', state: { transition: slideRight } }} replace>
              Log in here
            </TextLink>
            .
          </p>
        ) : (
          <p>
            New here?{' '}
            <TextLink to={{ pathname: 'signup', state: { transition: slideLeft } }} replace>
              Create an account
            </TextLink>
            .
          </p>
        )}
      </fieldset>
      {loading && <Loader />}
    </form>
  )
}

LoginForm.propTypes = {
  mode: PropTypes.oneOf(['login', 'signup']),
  name: PropTypes.string,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string.isRequired),
    email: PropTypes.arrayOf(PropTypes.string.isRequired),
    password: PropTypes.arrayOf(PropTypes.string.isRequired),
    passwordConfirmation: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  loading: PropTypes.bool,
  returnTo: PropTypes.oneOfType([
    ReactRouterPropTypes.location.isRequired,
    PropTypes.string.isRequired,
  ]),
  onNameChanged: PropTypes.func,
  onEmailChanged: PropTypes.func.isRequired,
  onPasswordChanged: PropTypes.func.isRequired,
  onPasswordConfirmationChanged: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
}

LoginForm.defaultProps = {
  name: '',
  passwordConfirmation: '',
  mode: 'login',
  errors: {},
  loading: false,
  returnTo: '/',
  onNameChanged: () => {},
  onPasswordConfirmationChanged: () => {},
}

export default LoginForm
