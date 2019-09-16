import React, { useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Button from 'atoms/button'
import Panel from './panel'

const Section = ({ name, label, icon, open, children, onToggle, ...props }) => {
  const toggle = useCallback(() => onToggle(name), [onToggle, name])

  return (
    <div className={classNames('accordion__section', open && 'accordion__section--open')}>
      <Button
        className={classNames('accordion__button', open && 'accordion__button--open')}
        text={label}
        icon={icon}
        onClick={toggle}
      />
      <Panel open={open} {...props}>
        {children}
      </Panel>
    </div>
  )
}

Section.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.icon,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
}

Section.defaultProps = {
  icon: undefined,
  open: false,
  onToggle: () => {},
}

export default Section