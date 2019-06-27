import React from 'react'
import classNames from 'classnames'
import Group from './group'
import Text from './text'
import './index.scss'

const Counter = ({ className, children, ...props }) => (
  <div className={classNames('counter', className)} {...props}>
    {children}
  </div>
)

Counter.Group = Group
Counter.Text = Text

export default Counter
