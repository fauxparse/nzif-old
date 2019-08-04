import React from 'react'
import classNames from 'classnames'
import Icon from 'atoms/icon'

import './index.scss'

const Checkbox = ({ className, children, ...props }) => (
  /* eslint-disable-next-line react/prop-types */
  <label className={classNames('checkbox', props.checked && 'checkbox--checked', className)}>
    <input type="checkbox" className="checkbox__input" {...props} />
    <Icon className="checkbox__icon" viewBox="-16 -16 32 32">
      <circle className="checkbox__focus" cx={0} cy={0} r={13} />
      <path className="checkbox__circle" d="M0 -10a10 10 0 0 1 0 20a10 10 0 0 1 0 -20" />
      <path className="checkbox__check" d="M5 -3l-6 6l-3-3" />
    </Icon>
    {children && <div className="checkbox__label">{children}</div>}
  </label>
)

export default Checkbox
