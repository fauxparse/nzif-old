import React from 'react'
import classNames from 'classnames'
import Context from './context'

class List extends React.Component {
  static contextType = Context

  render() {
    const { className, children, selection, onResize, ...props } = this.props
    const { start, end, scale, granularity } = this.context
    const rows = (end - start) * granularity

    return (
      <div
        className={classNames('timetable__list', className)}
        scale={scale}
        granularity={granularity}
        data-rows={rows}
        style={{
          gridTemplateRows: `repeat(${rows}, 1em)`,
          fontSize: `${scale}em`,
          backgroundSize: `100% ${granularity}em`,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
}

export default List
