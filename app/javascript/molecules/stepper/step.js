import React, { useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Icon from 'atoms/icon'

const Step = ({ className, completed, current, icon, text, disabled, onClick, ...props }) => {
  const clicked = useCallback((e) => {
    if (onClick && !disabled) { onClick(e) }
  }, [onClick, disabled])

  return (
    <div
      className={classNames(
        'step',
        completed && 'step--completed',
        current && 'step--current',
        onClick && 'step--clickable',
        className,
      )}
      disabled={disabled || undefined}
      onClick={clicked}
      {...props}
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
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

Step.defaultProps = {
  className: undefined,
  completed: false,
  current: false,
  disabled: false,
  onClick: null,
}

export default Step
