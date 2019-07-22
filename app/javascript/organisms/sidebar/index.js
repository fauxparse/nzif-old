import React, { useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'lib/proptypes'
import ClickOutside from 'lib/click_outside'
import './index.scss'

const Sidebar = ({
  className,
  open,
  onClickOutside,
  children,
  ...props
}) => {
  const ref = useRef()

  return (
    <aside
      ref={ref}
      className={classNames(
        'sidebar',
        open && 'sidebar--open',
        className,
      )}
      {...props}
    >
      {children}
      {open && <ClickOutside element={ref.current} onClick={onClickOutside} />}
    </aside>
  )
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClickOutside: PropTypes.func,
}

Sidebar.defaultProps = {
  open: false,
  onClickOutside: () => {},
}

export default Sidebar
