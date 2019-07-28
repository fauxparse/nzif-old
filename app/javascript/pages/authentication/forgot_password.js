import React, { useCallback, useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import ForgotPasswordForm from 'organisms/forgot_password_form'
import { FORGOT_PASSWORD_MUTATION } from 'queries'

const ForgotPassword = ({ className }) => {
  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(false)

  const [sent, setSent] = useState(false)

  const [errors, setErrors] = useState({})

  const sendResetRequest = useMutation(FORGOT_PASSWORD_MUTATION, {
    update: (proxy, { data: { requestPasswordReset: sent } }) => {
      setLoading(false)
      if (sent) {
        setSent(true)
      } else {
        setErrors({ email: ['Email address is invalid'] })
      }
    }
  })

  const submit = useCallback((variables) => {
    setLoading(true)
    sendResetRequest({ variables })
      .catch(e => {
        setLoading(false)
        setErrors({ email: [e.graphQLErrors[0].message] })
      })
  }, [sendResetRequest, setLoading, setErrors])

  return (
    <ForgotPasswordForm
      className={className}
      email={email}
      loading={loading}
      sent={sent}
      errors={errors}
      onEmailChanged={setEmail}
      onSubmit={submit}
    />
  )
}

export default ForgotPassword
