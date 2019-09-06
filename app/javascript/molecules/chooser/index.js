import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import { Popper } from 'react-popper'
import MiniSearch from 'minisearch'
import deburr from 'lodash/deburr'
import PropTypes from 'lib/proptypes'
import { useFocusWithin } from 'lib/hooks'
import TextField from 'atoms/text_field'
import Portal from 'molecules/menu/portal'
import SelectedOption from './selected_option'
import Menu from './menu'

import './index.scss'

const useParentTheme = (ref) => {
  const [theme, setTheme] = useState()

  useEffect(() => {
    const themeParent = ref.current.closest('[data-theme]')
    if (themeParent) setTheme(themeParent.dataset.theme)
  }, [ref])

  return theme
}

const Chooser = ({
  className,
  autoFocus,
  options,
  selected,
  placeholder,
  onFocus,
  onBlur,
  onChange
}) => {
  const container = useRef()

  const textField = useRef()

  const [search, setSearch] = useState('')

  const searchChanged = useCallback(e => setSearch(e.target.value), [setSearch])

  const [menuVisible, setMenuVisible] = useState(false)

  const [closed, setClosed] = useState(false)

  const [highlightId, setHighlightId] = useState()

  useEffect(() => setClosed(!search.length), [search, setClosed])

  useEffect(() => {
    setMenuVisible(search.length > 0 && !closed)
  }, [search, closed, setMenuVisible])

  const blur = useCallback((e) => {
    setClosed(true)
    if (onBlur) onBlur(e)
  }, [setClosed, onBlur])

  const focused = useFocusWithin(container, onFocus, blur)

  const select = useCallback(option => {
    if (!selected.includes(option)) {
      onChange([...selected, option])
      setSearch('')
      setHighlightId(undefined)
    }
  }, [onChange, selected])

  const deselect = useCallback(option => {
    onChange(selected.filter(o => o !== option))
    textField.current.focus()
  }, [onChange, selected])

  const theme = useParentTheme(container)

  const searcher = useMemo(() => {
    const miniSearch = new MiniSearch({
      fields: ['label'],
      searchOptions: {
        tokenize: string => deburr(string).toLowerCase().split(/[^a-zA-Z0-9\u00C0-\u017F]+/),
        processTerm: deburr,
        prefix: true,
        fuzzy: 0.25,
      },
    })
    miniSearch.addAll(options)
    return miniSearch
  }, [options])

  const byId = useMemo(() => (
    options.reduce((hash, option) => ({ ...hash, [option.id]: option }), {})
  ), [options])

  const filtered = useMemo(() => {
    if (search) {
      return searcher.search(search).map(({ id }) => byId[id])
    } else {
      return []
    }
  }, [searcher, search, byId])

  const moveHighlight = useCallback((direction = 1) => {
    if (filtered.length) {
      if (highlightId) {
        const index = filtered.findIndex(o => o.id === highlightId)
        setHighlightId(filtered[(index + filtered.length + direction) % filtered.length].id)
      } else if (direction > 0) {
        setHighlightId(filtered[0].id)
      } else {
        setHighlightId(filtered[filtered.length - 1].id)
      }
    } else {
      setHighlightId(null)
    }
  }, [filtered, highlightId, setHighlightId])

  const keyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowDown':
        moveHighlight(1)
        e.preventDefault()
        break
      case 'ArrowUp':
        moveHighlight(-1)
        e.preventDefault()
        break
      case 'Enter':
        if (highlightId) {
          select(byId[highlightId])
        }
        break
      case 'Escape':
        setClosed(true)
        break
      case 'Backspace':
        if (!search) {
          const focusedOption = e.target.closest('.selected-option')
          if (focusedOption) {
            deselect(byId[focusedOption.dataset.id])
            e.preventDefault()
          } else {
            const previous = container.current.querySelectorAll('.selected-option')
            if (previous.length) {
              previous[previous.length - 1].focus()
              e.preventDefault()
            }
          }
        }
    }
  }, [moveHighlight, highlightId, byId, select, deselect, search, setClosed])

  return (
    <div
      ref={container}
      className={classNames(
        'chooser',
        focused && 'chooser--focus',
        className,
      )}
      onKeyDown={keyDown}
    >
      {selected.map(option => (
        <SelectedOption key={option.id} option={option} onRemove={deselect} />
      ))}
      <TextField
        ref={textField}
        className="chooser__text-field"
        value={search}
        placeholder={selected.length ? undefined : placeholder}
        autoSize
        autoFocus={autoFocus}
        onChange={searchChanged}
      />
      <Popper placement="bottom-start" positionFixed referenceElement={textField.current}>
        {({ ref, style, placement, scheduleUpdate }) => (
          <Portal>
            <Menu
              ref={ref}
              open={menuVisible}
              update={scheduleUpdate}
              onClick={select}
              style={style}
              options={filtered}
              highlightId={highlightId}
              search={search}
              data-placement={placement}
              data-theme={theme}
            />
          </Portal>
        )}
      </Popper>
    </div>
  )
}

Chooser.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.id.isRequired,
  }).isRequired).isRequired,
  selected: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.id.isRequired,
  }).isRequired).isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
}

Chooser.defaultProps = {
  autoFocus: undefined,
  placeholder: undefined,
  onFocus: undefined,
  onBlur: undefined,
}

export default Chooser
