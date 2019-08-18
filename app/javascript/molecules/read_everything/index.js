import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'

import './index.scss'

const useIntersectionObserver = (ref, callback, options = {}) => {
  const observer = useRef()

  const observe = useCallback((entries) => {
    entries.forEach(entry => callback(entry))
  }, [callback])

  useEffect(() => {
    observer.current = new IntersectionObserver(observe, options)
    observer.current.observe(ref.current)

    return () => observer.current.disconnect()
  }, [observer, ref, observe, options])
}

const ReadEverything = ({ className, disabled, onRead, children, ...props }) => {
  const endRef = useRef()

  const [read, setRead] = useState(false)

  const observe = useCallback(({ isIntersecting }) => {
    if (!disabled && isIntersecting && !read) {
      setRead(true)
      onRead()
    }
  }, [disabled, read, setRead, onRead])

  useIntersectionObserver(endRef, observe)

  return (
    <div className={classNames('read-everything', className)} {...props}>
      <div className="read-everything__content">
        {children}
      </div>
      <div ref={endRef} className="read-everything__end" />
    </div>
  )
}

ReadEverything.propTypes = {
  disabled: PropTypes.bool,
  onRead: PropTypes.func.isRequired,
}

ReadEverything.defaultProps = {
  disabled: false,
}

export default ReadEverything
