import React from 'react'
import Context from './context'

class Times extends React.Component {
  static contextType = Context

  container = React.createRef()

  componentDidMount() {
    this.intersectionObserver = new IntersectionObserver(this.observe, {
      threshold: [0, 1],
      rootMargin: '-88px 0px 0px 0px',
    })
    Array.from(this.container.current.querySelectorAll('span'))
      .forEach(el => this.intersectionObserver.observe(el))
  }

  observe = (entries) => {
    entries.forEach(({ target, boundingClientRect, rootBounds }) => {
      const hidden = boundingClientRect.y < rootBounds.y
      target.setAttribute('aria-hidden', hidden)
    })
  }

  render() {
    const { start, end, scale, granularity } = this.context

    return (
      <aside
        ref={this.container}
        className="timetable__times"
        {...this.props}
      >
        {Array(end - start).fill(0).map((_, i) => i + start).map(hour => (
          <span
            key={hour}
            className="timetable__time"
            style={{
              paddingTop: `${scale * granularity - 1}rem`,
            }}
          >
            {(hour - 1) % 12 + 1} {(hour % 24) < 12 ? 'AM' : 'PM'}
          </span>
        ))}
      </aside>
    )
  }
}

export default Times
