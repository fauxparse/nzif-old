import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Ripple from 'effects/ripple'
import './index.scss'

const Logo = ({ as: Component, className, year, ...props }) => (
  <Component className={classNames('logo', className)} {...props}>
    <Ripple />
    <span className="logo__nzif">NZIF</span>
    {year && <span className="logo__year">&nbsp;{year}</span>}
  </Component>
)

Logo.propTypes = {
  as: PropTypes.component,
  year: PropTypes.id,
}

Logo.defaultProps = {
  as: 'span',
  year: undefined
}

export default Logo
