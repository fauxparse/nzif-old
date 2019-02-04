import React from 'react'
import classNames from 'classnames'
import { Link } from '../ripple'

const Tab = ({ className, children, ...props }) => (
  <Link
    className={classNames('tabs__tab', className)}
    role="tab"
    activeClassName="tabs__tab--active"
    replace
    exact
    {...props}
  >
    {children}
  </Link>
)

export default Tab
