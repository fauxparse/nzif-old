import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import { SelectContext } from './context'

const Container = ({ className, disabled, onKeyDown, children, ...props }) => {
  const {
    selectedOption,
    moveHighlight,
    highlightFirst,
    highlightLast,
    highlightedOption,
    menu,
    select,
    search,
  } = useContext(SelectContext)

  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    if (searchString) {
      const timer = setTimeout(() => setSearchString(''), 1000)
      return () => clearTimeout(timer)
    }
  }, [searchString, setSearchString])

  useEffect(() => {
    if (searchString) search(searchString)
  }, [search, searchString])

  const keyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowUp':
        moveHighlight(-1)
        e.preventDefault()
        break
      case 'ArrowDown':
        moveHighlight(1)
        e.preventDefault()
        break
      case ' ':
      case 'Enter':
        if (menu.open) {
          if (highlightedOption) select(highlightedOption.id)
        } else {
          menu.show()
        }
        e.preventDefault()
        break
      case 'Escape':
        menu.hide()
        e.preventDefault()
        break
      case 'Home':
        highlightFirst()
        e.preventDefault()
        break
      case 'End':
        highlightLast()
        e.preventDefault()
        break
      case 'Backspace':
        setSearchString(setSearchString.subStr(0, setSearchString.length - 1))
        e.preventDefault()
        break
      default:
        if (e.key.length === 1) {
          setSearchString(searchString + e.key)
        }
        if (onKeyDown) onKeyDown(e)
    }
  }, [
    highlightedOption,
    menu,
    moveHighlight,
    highlightFirst,
    highlightLast,
    onKeyDown,
    select,
    searchString,
    setSearchString,
  ])

  return (
    <div
      className={classNames(
        'select',
        !selectedOption && 'select--empty',
        menu.open && 'select--open',
        className,
      )}
      tabIndex={0}
      role="menu"
      aria-disabled={disabled || undefined}
      onKeyDown={keyDown}
      onBlur={menu.hide}
      {...props}
    >
      {children}
    </div>
  )
}

Container.propTypes = {
  disabled: PropTypes.bool,
  onKeyDown: PropTypes.func,
}

Container.defaultProps = {
  disabled: false,
  onKeyDown: undefined,
}

export default Container
