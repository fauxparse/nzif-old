import React, { forwardRef, useContext, useEffect } from 'react'
import PropTypes from 'lib/proptypes'
import RelativePortal from 'react-relative-portal'
import { CSSTransition } from 'react-transition-group'
import ThemeContext from 'lib/theme_context'
import Divider from 'atoms/divider'
import List from 'molecules/list'
import { SelectContext } from './context'
import Option from './option'

const Menu = forwardRef(({ onShow }, ref) => {
  const { menuId, triggerId, menu, options, value, highlight, select } = useContext(SelectContext)

  const theme = useContext(ThemeContext)

  const { open } = menu

  useEffect(() => {
    if (open) {
      onShow()
    }
  }, [open, onShow])

  useEffect(() => {
    if (open && highlight !== undefined) {
      const option = ref.current.children[highlight]
      if (option) option.scrollIntoView({ block: 'nearest' })
    }
  }, [open, highlight, ref])

  return (
    <RelativePortal
      className="select__portal"
      left={-16}
      top={-48}
      data-theme={theme}
      onOutClick={menu.hide}
    >
      <CSSTransition
        in={menu.open}
        timeout={450}
        classNames="select__options-"
        mountOnEnter
        unmountOnExit
      >
        <List
          id={menuId}
          className="select__options"
          ref={ref}
          role="menu"
          aria-labelledby={triggerId}
        >
          {options.map((option, index) => (option.divider ? (
            <Divider key={`_divider-${index}`} role="listitem" aria-hidden />
          ) : (
            <Option
              key={option.id}
              {...option}
              selected={option.id === value}
              highlight={index === highlight}
              onClick={select}
            />
          )))}
        </List>
      </CSSTransition>
    </RelativePortal>
  )
})

Menu.displayName = 'Select.Menu'

Menu.propTypes = {
  onShow: PropTypes.func.isRequired,
}

Menu.defaultProps = {

}

export default Menu
