import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import stickybits from 'stickybits'
import { v4 as uuid } from 'uuid'
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
