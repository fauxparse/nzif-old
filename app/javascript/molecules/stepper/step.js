import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Icon from 'atoms/icon'

const Step = ({ className, completed, current, icon, text }) => {
  return (
    <div
      className={classNames(
        'step',
        completed && 'step--completed',
        current && 'step--current',
        className,
      )}
    >
      <span className="step__icon">
        <Icon name={completed ? 'check' : icon} />
      </span>
      <span className="step__text">{text}</span>
    </div>
  )
}

Step.propTypes = {
  className: PropTypes.className,
  completed: PropTypes.bool,
  current: PropTypes.bool,
  icon: PropTypes.icon.isRequired,
  text: PropTypes.string.isRequired,
}

Step.defaultProps = {
  className: undefined,
  completed: false,
  current: false,
}

export default Step
