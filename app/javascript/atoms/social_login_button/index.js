import React from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import Button from 'atoms/button'

import './index.scss'

export const PLATFORMS = ['google', 'facebook', 'twitter']

const SocialLoginButton = ({ platform, returnTo }) => (
  <Button
    as="a"
    className="social-login-button"
    href={`/auth/${platform}?origin=${returnTo.pathname || returnTo}`}
    icon={platform}
    data-method="post"
  />
)

SocialLoginButton.propTypes = {
  platform: PropTypes.oneOf(PLATFORMS).isRequired,
  returnTo: PropTypes.oneOfType([ReactRouterPropTypes.location, PropTypes.string]),
}

SocialLoginButton.defaultProps = {
  returnTo: '/',
}

export default SocialLoginButton
