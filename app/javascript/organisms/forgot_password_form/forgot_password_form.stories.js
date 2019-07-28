/* global module */
/* eslint-disable react/prop-types */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { storiesOf } from '@storybook/react'
import ForgotPasswordForm from './'

const ForgotPasswordDemo = ({ withErrors }) => {
  const timer = useRef()

  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(false)

  const [complete, setComplete] = useState(false)

  const [errors, setErrors] = useState({})

  const loaded = useCallback(() => {
    setLoading(false)
    setErrors(withErrors ? { email: ['Email is invalid'] } : {})
    setComplete(!withErrors)
  }, [setLoading, withErrors, setErrors])

  const submit = useCallback((_variables) => {
    setLoading(true)
    timer.current = setTimeout(loaded, 1000)
  }, [timer, loaded, setLoading])

  useEffect(() => () => {
    clearTimeout(timer.current)
  }, [])

  return (
    <ForgotPasswordForm
      email={email}
      loading={loading}
      sent={complete}
      errors={errors}
      onEmailChanged={setEmail}
      onSubmit={submit}
    />
  )
}

storiesOf('Organisms|ForgotPasswordForm', module)
  .add('Successful', () => <ForgotPasswordDemo />)
  .add('Unsuccessful', () => <ForgotPasswordDemo withErrors />)
