import React, { forwardRef, useEffect } from 'react'
import PropTypes from 'lib/proptypes'
import List from 'molecules/list'
import Option from './option_wrapper'

const Menu = forwardRef(({ open, options, update, highlightId, onClick, ...props }, ref) => {
  useEffect(update, [open, options, highlightId])

  return (
    <div
      className="chooser__menu"
      ref={ref}
      {...props}
    >
      {open && options.length > 0 && (
        <List className="chooser__options">
          {options.map(option => (
            <Option
              key={option.id}
              option={option}
              highlight={option.id === highlightId}
              onClick={() => onClick(option)}
            />
          ))}
        </List>
      )}
    </div>
  )
})

Menu.displayName = 'Chooser.Menu'

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.id.isRequired,
  }).isRequired),
  highlightId: PropTypes.id,
  update: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

Menu.defaultProps = {
  highlightId: undefined,
}

export default Menu
