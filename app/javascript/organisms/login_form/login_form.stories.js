/* global module */
/* eslint-disable react/prop-types */

import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import LoginForm from './'

const LoginFormDemo = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  return (
    <LoginForm
      name={name}
      email={email}
      password={password}
      passwordConfirmation={passwordConfirmation}
      loading={boolean('Loading', false)}
      onNameChanged={setName}
      onEmailChanged={setEmail}
      onPasswordChanged={setPassword}
      onPasswordConfirmationChanged={setPasswordConfirmation}
      onSubmit={action('Submit')}
      {...props}
    />
  )
}

storiesOf('Organisms|LoginForm', module)
  .add('Log in', () => <LoginFormDemo />)
  .add('Bad log in', () => (
    <LoginFormDemo
      email="test@example.com"
      errors={{ email: ['Invalid email address or password'] }}
    />
  ))
  .add('Sign up', () => <LoginFormDemo mode="signup" />)
  .add('Bad sign up', () => (
    <LoginFormDemo
      name="Kiki Hohnen"
      email="test@example.com"
      mode="signup"
      errors={{ email: ['Email address is already in use'] }}
    />
  ))
