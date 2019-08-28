import React from 'react'
import { Link } from 'react-router-dom'
import Ripple from 'effects/ripple'

import './index.scss'

const RegisterButton = (props) => (
  <Link className="register-button" {...props}>
    <span className="register-button__text">
      Register now
    </span>

    <Ripple />

    <span className="register-button__dial" role="presentation">
      <span className="register-button__numbers">
        {new Array(12).fill(0).map((_, i) => <i key={i}>{i}</i>)}
      </span>
    </span>
  </Link>
)

export default RegisterButton
