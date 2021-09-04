import React from 'react'

const Heading = ({ children }) => {
  return (
    <h2 className="registration-form__heading" tabIndex={-1}>
      {children}
    </h2>
  )
}

export default Heading
