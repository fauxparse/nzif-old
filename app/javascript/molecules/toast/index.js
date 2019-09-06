import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import toaster from 'toasted-notes'
import Icon from 'atoms/icon'

import 'toasted-notes/src/styles.css'
import './index.scss'

const Toast = ({ className, icon, children, onClose }) => (
  <div className={classNames('toast', className)}>
    {icon && <Icon name={icon} className="toast__icon" />}
    <div className="toast__content">
      {children}
    </div>
    <button className="button button--icon toast__close" onClick={onClose}>
      <Icon className="button__icon" name="close" />
    </button>
  </div>
)

Toast.propTypes = {
  icon: PropTypes.icon,
  onClose: PropTypes.func.isRequired,
}

const DEFAULT_OPTIONS = {
  position: 'bottom-right',
  duration: 3000,
}

export const notify = (content, { icon, ...options } = {}) =>
  toaster.notify(({ onClose }) => (
    <Toast
      icon={icon}
      onClose={onClose}
    >
      {content}
    </Toast>
  ), { ...DEFAULT_OPTIONS, ...options })


export default Toast
