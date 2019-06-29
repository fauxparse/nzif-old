import React from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import Button from '../../atoms/button'

const SocialLogin = ({ platform, returnTo }) => (
  <Button
    as="a"
    className="login__social"
    href={`/auth/${platform}?origin=${returnTo.pathname || returnTo}`}
    icon={platform}
    data-method="post"
  />
)

SocialLogin.propTypes = {
  platform: PropTypes.oneOf(['google', 'facebook', 'twitter']),
  returnTo: PropTypes.oneOfType([ReactRouterPropTypes.location, PropTypes.string ]),
}

export default SocialLogin
