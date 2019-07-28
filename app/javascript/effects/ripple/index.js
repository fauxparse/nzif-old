import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import PropTypes from 'lib/proptypes'
import './index.scss'

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

const useList = () => {
  const [list, dispatch] = useReducer((state, { type, ...props }) => {
    if (type === 'add') {
      return [...state, props]
    } else if (type === 'remove') {
      return state.filter(item => item.key !== props.key)
    } else {
      return state
    }
  }, [])

  const add = props => dispatch({ type: 'add', ...props })
  const remove = props => dispatch({ type: 'remove', ...props })

  return [list, add, remove]
}

const Ripple = ({ className, center, disabled, ...props }) => {
  const ref = useRef()

  const [parent, setParent] = useState()

  const [ripples, addRipple, removeRipple] = useList()

  useEffect(() => {
    setParent(ref.current.offsetParent)
  }, [])

  const start = useCallback((e, coordinates) => {
    if (disabled || e.defaultPrevented) return

    const { width, height } = parent.getBoundingClientRect()
    const { x, y } =
      center ? { x: width / 2, y: height / 2 } : trueClientPosition(coordinates, parent)
    const rx = Math.max(Math.abs(width - x), x) * 2 + 2
    const ry = Math.max(Math.abs(height - y), y) * 2 + 2
    const r = Math.sqrt(rx ** 2 + ry ** 2)

    addRipple({ x, y, r, key: Date.now().toString() })
  }, [parent, center, disabled, addRipple])

  const mouseDown = useCallback(e => start(e, { x: e.clientX, y: e.clientY }), [start])

  const touchStart = useCallback((e) => {
    const touch = e.touches[0]
    start(e, { x: touch.clientX, y: touch.clientY })
  }, [start])

  useEffect(() => {
    if (parent) {
      parent.addEventListener('mousedown', mouseDown)
      parent.addEventListener('touchstart', touchStart)

      return () => {
        parent.removeEventListener('mousedown', mouseDown)
        parent.removeEventListener('touchstart', touchStart)
      }
    }
  }, [parent, mouseDown, touchStart])

  const rippleEntered = useCallback((el) => removeRipple({ key: el.dataset.key }), [removeRipple])

  return (
    <span ref={ref} className={classNames('ripple__container', className)} {...props}>
      <TransitionGroup component={null} enter exit>
        {ripples.map(({ key, x, y, r }) => (
          <CSSTransition key={key} classNames="ripple" timeout={500} onEntered={rippleEntered}>
            <span
              className="ripple"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${r}px`,
                height: `${r}px`,
              }}
              data-key={key}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </span>
  )
}

Ripple.propTypes = {
  center: PropTypes.bool,
  disabled: PropTypes.bool,
}

Ripple.defaultProps = {
  center: false,
  disabled: undefined,
}

export default Ripple
