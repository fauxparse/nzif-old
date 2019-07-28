import React, { Fragment, useCallback, useEffect, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import Button from 'atoms/button'
import Loader from 'atoms/loader'
import LabelledField from 'molecules/labelled_field'

import './index.scss'

const ResetPasswordForm = ({
  className,
  password,
  passwordConfirmation,
  loading,
  complete,
  errors,
  onPasswordChanged,
  onPasswordConfirmationChanged,
  onSubmit,
  ...props
}) => {
  const container = useRef()

  const passwordChanged = useCallback((e) => {
    onPasswordChanged(e.target.value)
  }, [onPasswordChanged])

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
    onSubmit({ password, passwordConfirmation })
  }, [password, passwordConfirmation, onSubmit])

  return (
    <form
      ref={container}
      className={classNames('login-form', 'reset-password-form', className)}
      onSubmit={submit}
      {...props}
    >
      <fieldset
        className="popover__wrapper"
        disabled={loading || undefined}
        aria-busy={loading || undefined}
      >
        <h2 className="login-form__title">Reset your password</h2>
        {complete ? (
          <p className="login-form__message">
            Your password was reset.
          </p>
        ) : errors.token ? (
          <Fragment>
            <p>
              Sorry, that link isn’t valid. Maybe it’s expired?
            </p>
            <Button
              primary
              as={Link}
              to='/password/forgot'
              text="Start again?"
            />
          </Fragment>
        ) : (
          <Fragment>
            <p className="login-form__message">
              {isEmpty(errors) ? (
                'Enter a new password below.'
              ) : (
                'Please make sure the passwords match.'
              )}
            </p>

            <LabelledField
              label="New password"
              name="password"
              type="password"
              id="reset-password__password"
              required
              autoComplete="off"
              value={password}
              errors={errors}
              onChange={passwordChanged}
            />

            <LabelledField
              label="Confirm password"
              name="passwordConfirmation"
              type="password"
              id="reset-password__password-confirmation"
              required
              autoComplete="off"
              value={passwordConfirmation}
              errors={errors}
              onChange={passwordConfirmationChanged}
            />

            <div className="login-form__buttons">
              <Button
                className="login-form__submit"
                primary
                type="submit"
                text="Change password"
              />
            </div>
          </Fragment>
        )}
      </fieldset>
      {loading && <Loader />}
    </form>
  )
}

ResetPasswordForm.propTypes = {
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  complete: PropTypes.bool,
  errors: PropTypes.shape({
    token: PropTypes.arrayOf(PropTypes.string.isRequired),
    password: PropTypes.arrayOf(PropTypes.string.isRequired),
    passwordConfirmation: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onPasswordChanged: PropTypes.func.isRequired,
  onPasswordConfirmationChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

ResetPasswordForm.defaultProps = {
  loading: false,
  complete: false,
  errors: {},
}

export default ResetPasswordForm
