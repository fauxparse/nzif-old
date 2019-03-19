import React from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import Button from '../button'

const SocialLogin = ({ platform, returnTo }) => (
  <Button
    as="a"
    className="login__social"
    href={`/auth/${platform}?origin=${returnTo.pathname || returnTo}`}
    icon={platform}
  />
)

SocialLogin.propTypes = {
  platform: PropTypes.oneOf(['facebook']),
  returnTo: PropTypes.oneOfType([ReactRouterPropTypes.location, PropTypes.string ]),
}

export default SocialLogin
