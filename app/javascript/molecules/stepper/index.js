import React from 'react'
import classNames from 'classnames'
import Step from './step'

import './index.scss'

const Stepper = ({ className, children, ...props }) => {
  return (
    <div className={classNames('stepper', className)} {...props}>
      {children}
    </div>
  )
}

Stepper.Step = Step

export default Stepper
