import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react'
import stickybits from 'stickybits'
import { v4 as uuid } from 'uuid'
import isEqual from 'lodash/isEqual'
import CurrentUserContext from 'contexts/current_user'

export const useClock = () => {
  const ticker = useRef()

  const [time, setTime] = useState(Date.now())

  const tick = useCallback(() => {
    setTime(Date.now())
  }, [setTime])

  useEffect(() => {
    ticker.current = setInterval(tick, 1000)
    return () => clearInterval(ticker.current)
  }, [tick])

  return time
}

export const useUUID = () => {
  const id = useRef(uuid())
  return id.current
}

export const useCurrentUser = () => useContext(CurrentUserContext)

export const useFocusWithin = ((ref, onFocus, onBlur) => {
  const [hasFocus, setHasFocus] = useState()

  const focusIn = useCallback((e) => {
    if (ref.current.contains(e.target)) {
      if (!hasFocus) {
        setHasFocus(true)
        if (onFocus) onFocus({ target: ref.current })
      }
    } else if (hasFocus) {
      setHasFocus(false)
      if (onBlur) onBlur({ target: ref.current, relatedTarget: e.target })
    }
  }, [ref, hasFocus, setHasFocus, onFocus, onBlur])

  const focusOut = useCallback((e) => {
    if (!e.relatedTarget || !ref.current.contains(e.relatedTarget)) {
      setHasFocus(false)
      if (onBlur) onBlur({ target: ref.current, relatedTarget: e.relatedTarget })
    }
  }, [ref, setHasFocus, onBlur])

  useEffect(() => {
    const container = ref.current

    container.addEventListener('focusin', focusIn)
    container.addEventListener('focusout', focusOut)

    return () => {
      container.removeEventListener('focusin', focusIn)
      container.removeEventListener('focusout', focusOut)
    }
  })

  return hasFocus
})

export const useResize = listener => useEffect(() => {
  window.addEventListener('resize', listener)
  return () => window.removeEventListener('resize', listener)
}, [listener])

export const useSticky = (options = {}, dependencies = []) => {
  const sticky = useRef()
  const stickySection = useRef()

  useEffect(() => {
    sticky.current && sticky.current.cleanup()
    sticky.current = stickybits(stickySection.current, options)
    return () => sticky.current.cleanup()
  }, [options])

  const updateSticky = useCallback(() => {
    sticky.current.update(options)
  }, [sticky, options])

  useResize(updateSticky)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(updateSticky, [options, ...dependencies])

  return stickySection
}

export const usePrevious = (value) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value;
  }, [value])

  return ref.current
}

export const useDeepState = (value) => {
  const [state, setState] = useState(value)
  const setStateIfNotEqual = useCallback((newState) => {
    if (!isEqual(state, newState)) {
      setState(newState)
    }
  }, [state, setState])
  return [state, setStateIfNotEqual]
}

export const useDeepMemo = (compute, dependencies) => {
  const [cached, update] = useState(compute())
  useEffect(() => {
    const replacement = compute()
    if (!isEqual(replacement, cached)) {
      update(replacement)
    }
  }, [compute, cached, update, ...dependencies]) // eslint-disable-line react-hooks/exhaustive-deps
  return cached
}

export const usePreferentialOrdering = (initialOrder) => {
  const [state, dispatch] = useReducer((ordering, { item, reset }) => {
    if (item) {
      const key = item.startsAt.valueOf()
      const order = ordering[key] || []
      return {
        ...ordering,
        [key]: order.includes(item) ? order.filter(i => i !== item) : [...order, item],
      }
    }

    if (reset) {
      return reset
    }

    return ordering
  }, initialOrder)

  const toggle = useCallback(item => dispatch({ item }), [dispatch])

  const reset = useCallback(ordering => dispatch({ reset: ordering }), [dispatch])

  return [state, toggle, reset]
}

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(!value), [value, setValue])

  const turnOn = useCallback(() => setValue(true), [setValue])

  const turnOff = useCallback(() => setValue(false), [setValue])

  return [value, toggle, turnOn, turnOff]
}

export const useChanged = (callback, watch, dependencies) => {
  const watched = useRef(watch)

  useEffect(() => {
    if (!isEqual(watch, watched.current)) {
      watched.current = watch.slice()
      callback()
    }
  }, [callback, ...watch, ...dependencies]) // eslint-disable-line react-hooks/exhaustive-deps
}

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error) // eslint-disable-line no-console
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error) // eslint-disable-line no-console
    }
  }

  return [storedValue, setValue]
}

export const useLocalStorageReducer = (key, reducer, initialValue) => {
  const [state, setState] = useLocalStorage(key, initialValue)

  const dispatch = useCallback((action) => {
    setState(reducer(state, action))
  }, [state, setState, reducer])

  return [state, dispatch]
}
