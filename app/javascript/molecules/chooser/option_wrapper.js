import React, { useEffect, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import Option from './option'

const OptionWrapper = ({ as: Component, highlight, ...props }) => {
  const ref = useRef()

  useEffect(() => {
    if (highlight) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [highlight])

  return (
    <div ref={ref} className="option__wrapper">
      <Component highlight={highlight} {...props} />
    </div>
  )
}

OptionWrapper.propTypes = {
  as: PropTypes.component,
  highlight: PropTypes.bool,
}

OptionWrapper.defaultProps = {
  as: Option,
  highlight: undefined,
}

export default OptionWrapper
