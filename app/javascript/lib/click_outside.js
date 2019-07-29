import React, { useCallback, useEffect } from 'react'
import PropTypes from 'lib/proptypes'

const ClickOutside = ({ element, onClick }) => {
  const mouseDown = useCallback((e) => {
    if (element && !element.contains(e.target)) {
      onClick(e)
    }
  }, [element, onClick])

  useEffect(() => {
    if (element) {
      document.addEventListener('mousedown', mouseDown, true)
      document.addEventListener('touchstart', mouseDown, true)

      return () => {
        document.removeEventListener('mousedown', mouseDown, true)
        document.removeEventListener('touchstart', mouseDown, true)
      }
    }
  }, [element, onClick, mouseDown])

  return null
}

ClickOutside.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default ClickOutside
