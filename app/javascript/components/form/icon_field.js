import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import classNames from 'classnames'
import Icon, { ICONS } from '../../atoms/icon'
import Tooltip from '../shared/tooltip'
import Loader from 'atoms/loader'

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 1 },
  exited:   { opacity: 0 },
}

const IconField = ({ className, label, loading, icon, children, ...props }) => (
  <div
    className={classNames('form__field', 'form__field--with-icon', className)}
    aria-label={label}
    {...props}
  >
    <Tooltip className="form__field-icon" title={label}>
      <Icon name={icon} />
      <Transition in={loading} timeout={300} appear>
        {state => (
          <Loader className="form__field-loader" style={transitionStyles[state]} />
        )}
      </Transition>
    </Tooltip>
    <div className="form__field-contents">
      {children}
    </div>
  </div>
)

IconField.propTypes = {
  icon: PropTypes.oneOf(ICONS).isRequired,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

IconField.defaultProps = {
  loading: false,
}

export default IconField
