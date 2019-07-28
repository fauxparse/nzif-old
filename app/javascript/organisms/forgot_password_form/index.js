import React, { Fragment, useCallback, useEffect, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import Button from 'atoms/button'
import Loader from 'atoms/loader'
import LabelledField from 'molecules/labelled_field'

import './index.scss'

const ForgotPasswordForm = ({
  className,
  email,
  loading,
  sent,
  errors,
  onEmailChanged,
  onSubmit,
  ...props
}) => {
  const container = useRef()

  const emailChanged = useCallback((e) => onEmailChanged(e.target.value), [onEmailChanged])

  useEffect(() => {
    if (container.current) {
      const input = container.current.querySelector('input')
      if (input) input.focus()
    }
  }, [container])

  const submit = useCallback((e) => {
    e.preventDefault()
    onSubmit({ email })
  }, [email, onSubmit])

  return (
    <form
      ref={container}
      className={classNames('login-form', 'forgot-password-form', className)}
      onSubmit={submit}
      {...props}
    >
      <fieldset
        className="popover__wrapper"
        disabled={loading || undefined}
        aria-busy={loading || undefined}
      >
        {sent ? (
          <Fragment>
            <h2 className="login-form__title">Check your email</h2>
            <p className="login-form__message">
              We’ve sent you a one-time link to reset your password.
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <h2 className="login-form__title">Forgot your password?</h2>
            {isEmpty(errors) ? (
              <p className="login-form__message">
                Enter your email address below to reset your password.
              </p>
            ) : (
              <p className="login-form__message">
                We couldn’t reset your password.
                <br/>
                Are you sure you’ve signed up and that <b>{email}</b> is the correct email address?
              </p>
            )}

            <LabelledField
              label="Email address"
              name="email"
              type="email"
              id="forgot-password__email"
              required
              value={email}
              autoComplete="username email"
              onChange={emailChanged}
            />

            <div className="login-form__buttons">
              <Button
                className="login-form__submit"
                primary
                type="submit"
                text="Reset my password"
              />
            </div>
          </Fragment>
        )}
      </fieldset>
      {loading && <Loader />}
    </form>
  )
}

ForgotPasswordForm.propTypes = {
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  sent: PropTypes.bool,
  errors: PropTypes.shape({
    email: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onEmailChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

ForgotPasswordForm.defaultProps = {
  loading: false,
  sent: false,
  errors: {},
}

export default ForgotPasswordForm
