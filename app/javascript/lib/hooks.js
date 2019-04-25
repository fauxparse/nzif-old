import { useEffect, useRef, useState } from 'react'
import stickybits from 'stickybits'

export const useSticky = (options = {}, dependencies = []) => {
  const sticky = useRef()
  const stickySection = useRef()
  const [width, setWidth] = useState()

  const onResize = () => setWidth(stickySection.current.offsetWidth)

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
