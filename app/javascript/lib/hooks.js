import { useEffect, useRef } from 'react'
import stickybits from 'stickybits'

export const useSticky = (options = {}, dependencies = []) => {
  const sticky = useRef()
  const stickySection = useRef()

  useEffect(() => {
    sticky.current && sticky.current.cleanup()
    sticky.current = stickybits(stickySection.current, options)
    return () => sticky.current.cleanup()
  }, [options, ...dependencies]) // eslint-disable-line react-hooks/exhaustive-deps

  return stickySection
}
