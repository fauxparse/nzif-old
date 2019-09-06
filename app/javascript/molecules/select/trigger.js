import React, { forwardRef, useContext } from 'react'
import PropTypes from 'lib/proptypes'
import Icon from 'atoms/icon'
import Ripple from 'effects/ripple'
import { SelectContext } from './context'

const Trigger = forwardRef(({ placeholder }, ref) => {
  const { menuId, triggerId, selectedOption, menu } = useContext(SelectContext)

  return (
    <div
      id={triggerId}
      className="select__trigger"
      ref={ref}
      role="menubutton"
      aria-haspopup
      aria-controls={menuId}
      aria-expanded={menu.open || undefined}
      onClick={menu.toggle}
    >
      <Ripple />
      <span className="select__current-value">
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      <Icon name="chevron-down" className="select__chevron" />
    </div>
  )
})

Trigger.displayName = 'Select.Trigger'

Trigger.propTypes = {
  placeholder: PropTypes.string,
}

Trigger.defaultProps = {
  placeholder: undefined,
}

export default Trigger
