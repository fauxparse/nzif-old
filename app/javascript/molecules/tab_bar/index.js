import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import { useSpring, animated, config as SPRINGS } from 'react-spring'

import './index.scss'

const TabBar = ({ className, children, ...props }) => {
  const container = useRef()

  const childArray = useMemo(() => React.Children.toArray(children), [children])

  const [selected, setSelected] = useState()

  useEffect(() => {
    const index = container.current && childArray.findIndex(child => child.props.selected)
    setSelected(index > -1 ? container.current.children[index] : undefined)
  }, [childArray, container])

  const highlight = useSpring({
    to: {
      transform: `translateX(${selected ? selected.offsetLeft : 0}px)`,
      width: selected ? selected.offsetWidth : 0,
    },
    config: SPRINGS.stiff,
  })

  return (
    <div
      ref={container}
      className={classNames('tab-bar', className)}
      role="tablist"
      {...props}
    >
      {children}
      <animated.span
        className="tab-bar__highlight"
        style={highlight}
      />
    </div>
  )
}

TabBar.propTypes = {
  className: PropTypes.className,
}

TabBar.defaultProps = {
  className: undefined,
}

export default TabBar
