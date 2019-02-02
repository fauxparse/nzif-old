import React from 'react'
import classNames from 'classnames'

const Loader = ({ className, ...props }) => (
  <div className={classNames('loader', className)} {...props}>
    <svg width="80px" height="80px" viewBox="-40 -40 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx={0} cy={0} r={32} />
    </svg>
  </div>
)

export default Loader
