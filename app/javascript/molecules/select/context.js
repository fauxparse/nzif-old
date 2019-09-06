import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useToggle } from 'lib/hooks'
import PropTypes from 'lib/proptypes'

export const SelectContext = createContext({})

const SelectProvider = ({
  options: optionsProp,
  value,
  children,
  onChange,
}) => {
  const id = useRef(uuid())

  const options = useMemo(() => (
    optionsProp.map(o => (o.id ? o : {
      id: o,
      label: o,
      divider: /^-+$/.test(o),
    }))
  ), [optionsProp])

  const selectedOption = useMemo(() => {
    return options.find(o => o.id && (o.id === value))
  }, [value, options])

  const [open, toggle, show, hide] = useToggle()

  const menu = useMemo(() => ({ open, toggle, show, hide }), [open, toggle, show, hide])

  useEffect(hide, [value])

  const [highlight, setHighlight] = useState(undefined)

  const highlightableOptions = useMemo(() => (
    options.map((o, i) => [o, i]).filter(([o]) => o.id && !o.divider)
  ), [options])

  useEffect(() => {
    if (open && selectedOption) {
      const index = highlightableOptions.findIndex(([o]) => o === selectedOption)
      if (index > -1) setHighlight(index)
    } else {
      setHighlight(undefined)
    }
  }, [open, setHighlight, selectedOption, highlightableOptions])

  const moveHighlight = useCallback((direction) => {
    const { length } = highlightableOptions
    if (!length) return

    show()
    if (highlight === undefined) {
      setHighlight(direction > 0 ? 0 : length - 1)
    } else {
      setHighlight((highlight + length + direction) % length)
    }
  }, [highlight, setHighlight, highlightableOptions, show])

  const highlightFirst = useCallback(() => {
    const { length } = highlightableOptions
    if (length) setHighlight(0)
  }, [highlightableOptions, setHighlight])

  const highlightLast = useCallback(() => {
    const { length } = highlightableOptions
    if (length) setHighlight(length - 1)
  }, [highlightableOptions, setHighlight])

  const [highlightedOption, highlightedIndex] = useMemo(() => {
    if (highlight === undefined) return [undefined, undefined]

    return highlightableOptions[highlight]
  }, [highlight, highlightableOptions])

  const search = useCallback((query) => {
    if (!query) return

    const expr = new RegExp(`^${query}`, 'i')
    const index = highlightableOptions.findIndex(([o]) => expr.test(o.label))

    if (index !== undefined) {
      if (open) {
        setHighlight(index)
      } else {
        onChange(highlightableOptions[index][0].id)
      }
    }
  }, [highlightableOptions, onChange, open])

  const select = onChange

  const context = useMemo(() => ({
    menuId: `select-${id.current}-menu`,
    triggerId: `select-${id.current}-button`,
    options,
    selectedOption,
    value,
    highlight: highlightedIndex,
    highlightedOption,
    moveHighlight,
    highlightFirst,
    highlightLast,
    menu,
    select,
    search,
  }), [
    options,
    selectedOption,
    value,
    highlightedIndex,
    highlightedOption,
    moveHighlight,
    highlightFirst,
    highlightLast,
    menu,
    select,
    search,
  ])

  return (
    <SelectContext.Provider value={context}>
      {children}
    </SelectContext.Provider>
  )
}

SelectProvider.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.id.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    PropTypes.string.isRequired,
  ])).isRequired,
  value: PropTypes.id,
  onChange: PropTypes.func.isRequired,
}

export default SelectProvider
