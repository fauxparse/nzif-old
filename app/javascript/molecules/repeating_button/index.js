import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'lib/proptypes'
import Button from 'atoms/button'

const INITIAL_DELAY = 500

const REPEAT_DELAY = 33

const RepeatingButton = ({ onClick, onMouseDown, onTouchStart, ...props }) => {
  const timer = useRef()

  const target = useRef()

  const repeater = useRef(onClick)

  useEffect(() => {
    repeater.current = onClick
  }, [onClick])

  const cancelTimer = useRef(() => {
    clearTimeout(timer.current)
    timer.current = undefined
    window.removeEventListener('mouseup', cancelTimer.current)
    window.removeEventListener('touchend', cancelTimer.current)
    repeater.current({ target: target.current })
  })

  const repeat = useCallback(() => {
    repeater.current({ target: target.current })
    timer.current = setTimeout(repeat, REPEAT_DELAY)
  }, [target])

  const start = useCallback(() => {
    timer.current = setTimeout(repeat, INITIAL_DELAY)
    window.addEventListener('mouseup', cancelTimer.current)
    window.addEventListener('touchend', cancelTimer.current)
  }, [repeat])

  const mouseDown = useCallback((e) => {
    target.current = e.target.closest('.button')
    start()
    if (onMouseDown) onMouseDown(e)
  }, [start, onMouseDown])

  const touchStart = useCallback((e) => {
    target.current = e.target.closest('.button')
    start()
    if (onTouchStart) onTouchStart(e)
  }, [start, onTouchStart])

  const keyPress = useCallback((e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      onClick(e)
    }
  }, [onClick])

  return (
    <Button
      onMouseDown={mouseDown}
      onTouchStart={touchStart}
      onKeyPress={keyPress}
      {...props}
    />
  )
}

RepeatingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func,
}

RepeatingButton.defaultProps = {
  onMouseDown: undefined,
  onTouchStart: undefined,
}

export default RepeatingButton
