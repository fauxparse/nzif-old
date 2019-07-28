import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Button from 'atoms/button'

import './index.scss'

const Popover = ({ className, children, wrapper: WrapperComponent, onClose, ...props }) => {
  return (
    <div className={classNames('popover', className)}>
      <svg
        className="popover__background"
        width="100%"
        height="100%"
        viewBox="-100 0 100 100"
      >
        <circle cx={0} cy={0} r={200} />
      </svg>
      <div className="popover__content">
        {WrapperComponent ? (
          <WrapperComponent className="popover__wrapper" {...props}>
            {children}
          </WrapperComponent>
        ) : (
          children
        )}
      </div>
      <Button className="popover__close" icon="close" onClick={onClose} />
    </div>
  )
}

Popover.propTypes = {
  wrapper: PropTypes.component,
  onClose: PropTypes.func.isRequired,
}

Popover.defaultProps = {
  wrapper: 'div',
}

export default Popover
