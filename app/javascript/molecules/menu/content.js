import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import List from 'molecules/list'

const KEYS = {
  ESC: 27,
  UP: 38,
  DOWN: 40,
}

const MenuContent = forwardRef(({ className, open, children, onClose, ...props }, ref) => {
  const listRef = useRef()

  const mountedRef = useRef()

  useEffect(() => {
    mountedRef.current = true
    return () => mountedRef.current = false
  }, [])

  useEffect(() => {
    if (open) listRef.current.parentElement.focus()
  }, [open, listRef])

  const moveSelection = (direction) => {
    const items = Array.from(listRef.current.querySelectorAll('[tabindex]'))
    const index = items.findIndex(el => document.activeElement === el)
    const newIndex =
      (index + direction + (index < 0 && direction < 0 ? 1 : 0) + items.length) % items.length
    items[newIndex].focus()
  }

  const keyDown = useCallback((e) => {
    if (open) {
      if (e.which === KEYS.ESC) {
        onClose()
      } else if (e.which === KEYS.DOWN) {
        moveSelection(1)
      } else if (e.which === KEYS.UP) {
        moveSelection(-1)
      }
    }
  }, [open, onClose])

  const focusOutside = useCallback((e) => {
    if (!mountedRef.current) return
    if (listRef.current.contains(e.target)) return

    const buttonId = listRef.current.closest('[aria-labelledby]').getAttribute('aria-labelledby')
    if (e.target.closest(`#${buttonId}`)) return

    onClose()
  }, [listRef, mountedRef, onClose])

  useEffect(() => {
    if (open) {
      document.addEventListener('focus', focusOutside)
      document.addEventListener('mousedown', focusOutside)
      document.addEventListener('touchstart', focusOutside)
      return () => {
        document.removeEventListener('focus', focusOutside)
        document.removeEventListener('mousedown', focusOutside)
        document.removeEventListener('touchstart', focusOutside)
      }
    }
  }, [open, focusOutside])

  return (
    <div
      className={classNames('menu__content', open && 'menu__content--open', className)}
      ref={ref}
      role="menu"
      tabIndex={open ? 0 : undefined}
      onKeyDown={keyDown}
      {...props}
    >
      <List ref={listRef} className="menu__list">
        {children}
      </List>
    </div>
  )
})

MenuContent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

MenuContent.displayName = 'Menu.Content'

export default MenuContent
