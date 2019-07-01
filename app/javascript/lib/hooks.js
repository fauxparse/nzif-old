import { useCallback, useEffect, useRef, useState } from 'react'
import stickybits from 'stickybits'
import { v4 as uuid } from 'uuid'

export const useSticky = (options = {}, dependencies = []) => {
  const sticky = useRef()
  const stickySection = useRef()
  const [width, setWidth] = useState()

  const onResize = useCallback(() => setWidth(stickySection.current.offsetWidth), [setWidth])

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [onResize])

  useEffect(() => {
    sticky.current && sticky.current.cleanup()
    sticky.current = stickybits(stickySection.current, options)
    return () => sticky.current.cleanup()
  }, [options, width, ...dependencies]) // eslint-disable-line react-hooks/exhaustive-deps

  return stickySection
}

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
