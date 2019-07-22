import React, { useRef, forwardRef } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import mojs from 'mo-js'

const trueClientPosition = (coordinates, element) => {
  let { x, y } = coordinates
  y += document.documentElement.scrollTop
  let el = element
  while (el) {
    const { x: tx, y: ty } = transformCoordinates(el)
    x -= el.offsetLeft + tx
    y -= el.offsetTop + ty
    el = el.offsetParent
  }
  return { x, y }
}

const transformCoordinates = element => {
  const style = getComputedStyle(element)
  if (style.transform) {
    const m = style.transform.match(/matrix(?:3d)?\(([^)]+)\)/)
    if (m) {
      const values = m[1].split(',').map(v => parseFloat(v.trim()))
      values.splice(0, values.length === 16 ? 12 : 4)
      return {
        x: values[0],
        y: values[1],
        z: values[2] || 0
      }
    }
  }

  return { x: 0, y: 0 }
}

const Ripple = forwardRef(
  ({ as: Container, className, onMouseDown, onTouchStart, children, ...props }, ref) => {
    const container = ref || useRef()

    const ripple = (x, y) => {
      const el = container.current
      const size = Math.max(el.offsetWidth, el.offsetHeight)
      const { x: left, y: top } = trueClientPosition({ x, y }, el)
      const shape = new mojs.Shape({
        parent: container.current,
        shape: 'circle',
        opacity: { 0.25: 0 },
        left,
        top,
        fill: 'currentColor',
        radius: size,
        scale: { 0: 1 },
        isShowEnd: false,
        isForce3d: true,
        duration: Math.max(500, 50 * Math.sqrt(size)),
        easing: mojs.easing.bezier(0.4, 0.0, 0.2, 1),
        onComplete: () => {
          shape.el.remove()
        }
      })
      shape.play()
    }

    const mouseDown = e => {
      ripple(e.clientX, e.clientY)
      onMouseDown && onMouseDown(e)
    }

    const touchStart = e => {
      const touch = e.touches[0]
      ripple(touch.clientX, touch.clientY)
      onTouchStart && onTouchStart(e)
    }

    return (
      <Container
        ref={container}
        className={classNames('ripple', className)}
        onMouseDown={mouseDown}
        onTouchStart={touchStart}
        {...props}
      >
        {children}
      </Container>
    )
  }
)

Ripple.propTypes = {
  as: PropTypes.component,
  className: PropTypes.className,
  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func
}

Ripple.defaultProps = {
  as: 'div'
}

export default Ripple
