import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Icon from 'atoms/icon'

import './index.scss'

const Radio = ({ as: Component, className, children, ...props }) => (
  /* eslint-disable-next-line react/prop-types */
  <Component className={classNames('radio', props.checked && 'radio--checked', className)}>
    <input type="radio" className="radio__input" {...props} />
    <Icon className="radio__icon" viewBox="-16 -16 32 32">
      <circle className="radio__focus" cx={0} cy={0} r={13} />
      <path className="radio__circle" d="M0 -10a10 10 0 0 1 0 20a10 10 0 0 1 0 -20" />
      <circle className="radio__check" cx={0} cy={0} r={6} />
    </Icon>
    {children && <div className="radio__label">{children}</div>}
  </Component>
)

Radio.propTypes = {
  as: PropTypes.component,
}

Radio.defaultProps = {
  as: 'label',
}

export default Radio
