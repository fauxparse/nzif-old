import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Icon from 'atoms/icon'
import { STEP_NAMES } from './constants'

const Step = ({ name, title, icon, active, completed, nextStep, onClick }) => {
  const className = classNames('step', 'pitch__step', {
    'step--completed': completed,
    'step--active': active,
    'step--next': nextStep,
  })

  return (
    <li
      className={className}
      data-step={name}
      onClick={(completed || nextStep) ? onClick : undefined}
    >
      <Icon name={icon} className="step__icon" width={40} height={40} viewBox="-8 -8 40 40">
        <use xlinkHref={`#icon-${icon}`} />
        <path className="step__check" d="M20 6L9 17l-5-5"/>
      </Icon>
      <span className="step__title">{title}</span>
    </li>
  )
}

Step.propTypes = {
  name: PropTypes.oneOf(STEP_NAMES).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.icon.isRequired,
  active: PropTypes.bool,
  completed: PropTypes.bool,
  nextStep: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default Step
