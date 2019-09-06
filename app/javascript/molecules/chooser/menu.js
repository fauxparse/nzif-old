import React, { forwardRef, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'lib/proptypes'
import List from 'molecules/list'
import Option from './option_wrapper'

const Menu = forwardRef(({ open, options, update, highlightId, onClick, ...props }, ref) => {
  useEffect(update, [open, options, highlightId])

  const [cachedOptions, setCachedOptions] = useState(options)

  useEffect(() => {
    if (open) setCachedOptions(options)
  }, [open, options, setCachedOptions])

  return (
    <div
      className="chooser__menu"
      ref={ref}
      {...props}
    >
      <CSSTransition
        in={open && options.length > 0}
        timeout={300}
        classNames="chooser__options-"
        mountOnEnter
        unmountOnExit
      >
        <List className="chooser__options">
          {cachedOptions.map(option => (
            <Option
              key={option.id}
              option={option}
              highlight={option.id === highlightId}
              onClick={() => onClick(option)}
            />
          ))}
        </List>
      </CSSTransition>
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
