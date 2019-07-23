import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Ripple from 'effects/ripple'

import './index.scss'

const Tab = ({
  as: Component,
  className,
  children,
  disabled,
  selected,
  text,
  ...props
}) => (
  <Component
    className={classNames('tab', selected && 'tab--selected', className)}
    disabled={disabled || undefined}
    role="tab"
    tabIndex={0}
    {...props}
  >
    <Ripple disabled={disabled} />
    {text && <span className="tab__text">{text}</span>}
    {children}
  </Component>
)

Tab.propTypes = {
  as: PropTypes.component,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.string,
}

Tab.defaultProps = {
  as: "button",
  selected: false,
  disabled: false,
  text: undefined,
}

export default Tab
