import React from 'react'
import classNames from 'classnames'

const Block = ({ className, start, height, children, ...props }) => (
  <div
    className={classNames('timetable__block', className)}
    data-start={start}
    data-height={height}
    style={{ gridRow: `${start + 1} / span ${height}` }}
    {...props}
  >
    {children}
  </div>
)

export default Block
