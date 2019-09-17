import React from 'react'
import Loader from 'atoms/loader'

const Redirect = () => (
  <div className="registration-form__redirect">
    <Loader className="redirect__loader" />
    <p className="redirect__message">
      Hold on while we redirect you…
    </p>
  </div>
)

export default Redirect