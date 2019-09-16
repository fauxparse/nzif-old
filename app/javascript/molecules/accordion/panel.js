import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import { ResizeObserver } from 'resize-observer'

const Panel = ({ className, open, children, ...props }) => {
  const inner = useRef()

  const [height, setHeight] = useState(0)

  const resized = useCallback((entries) => {
    entries.forEach(entry => {
      if (entry.contentBoxSize) {
        setHeight(entries[0].contentBoxSize.height)
      } else {
        setHeight(entries[0].contentRect.height)
      }
    })
  }, [setHeight])

  useEffect(() => {
    const observer = new ResizeObserver(resized)
    observer.observe(inner.current)
    return () => observer.disconnect()
  }, [inner, resized])

  return (
    <div
      className={classNames('accordion__panel', open && 'accordion__panel--open', className)}
      style={{
        height: open ? `${height}px` : 0
      }}
      {...props}
    >
      <div ref={inner} className="accordion__content">
        {children}
      </div>
    </div>
  )
}

Panel.propTypes = {
  open: PropTypes.bool.isRequired,
}

export default Panel