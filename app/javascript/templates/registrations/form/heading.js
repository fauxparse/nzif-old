import React, { useContext } from 'react'
import RegistrationFormContext from './context'
import Badge from 'atoms/badge'

const Heading = ({ children }) => {
  const { pageIndex } = useContext(RegistrationFormContext)

  return (
    <h2 className="registration-form__heading">
      <Badge>{pageIndex + 1}</Badge>
      {children}
    </h2>
  )
}

export default Heading
