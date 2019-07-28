/* global module */
/* eslint-disable react/prop-types */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { storiesOf } from '@storybook/react'
import ResetPasswordForm from './'

const ResetPasswordDemo = ({ invalid }) => {
  const timer = useRef()

  const [password, setPassword] = useState('')

  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [loading, setLoading] = useState(false)

  const [complete, setComplete] = useState(false)

  const [errors, setErrors] = useState({})

  const loaded = useCallback(() => {
    const match = password === passwordConfirmation
    setLoading(false)
    setErrors(match ? {} : { passwordConfirmation: ['Passwords don’t match'] })
    setComplete(match)
  }, [password, passwordConfirmation, setLoading, setErrors])

  const submit = useCallback((_variables) => {
    setLoading(true)
    timer.current = setTimeout(loaded, 1000)
  }, [timer, loaded, setLoading])

  useEffect(() => () => {
    clearTimeout(timer.current)
  }, [])

  return (
    <ResetPasswordForm
      password={password}
      passwordConfirmation={passwordConfirmation}
      loading={loading}
      complete={complete}
      errors={{ ...(invalid ? { token: ['Token is invalid'] } : {}), ...errors }}
      onPasswordChanged={setPassword}
      onPasswordConfirmationChanged={setPasswordConfirmation}
      onSubmit={submit}
    />
  )
}

storiesOf('Organisms|ResetPasswordForm', module)
  .add('Valid token', () => <ResetPasswordDemo />)
  .add('Invalid token', () => <ResetPasswordDemo invalid />)
