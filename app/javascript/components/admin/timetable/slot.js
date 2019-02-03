import React from 'react'
import classNames from 'classnames'

const Slot = ({ className, children, ...props }) => (
  <div className={classNames('timetable__slot', className)} {...props}>
    {children}
  </div>
)

export default Slot
