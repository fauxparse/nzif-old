import React from 'react'
import classNames from 'classnames'

const LETTERS = [
  'M87.1,182.5v95.9H26.5V61.7l125.2,98.8V64.6h60.8v216.7L87.1,182.5z',
  'M261.8,186.6h85.5v52.2H167.4l92-161.5h-81V25.2h174.8L261.8,186.6z',
  'M189.9,337h-62V123.3h62V337z',
  'M237.8,161.1h135.6v52.2h-73.6v31.8h62v50.8h-62v78.9h-62V161.1z',
]

class Background extends React.Component {
  ref = (el) => {
    this.el = el
  }

  mouseMove = (e) => {
    const width = this.el.offsetWidth
    const height = this.el.offsetHeight
    this.x = (e.clientX - width / 2) / width
    this.y = (e.clientY - height / 2) / height
    requestAnimationFrame(this.updateTransforms)
  }

  updateTransforms = () => {
    Array.from(this.el.querySelectorAll('.floating-letters__letter')).forEach((letter, i) => {
      const d = (i + 2) * -5
      letter.style.transform = `translate3d(${this.x * d}px, ${this.y * d}px, 0)`
    })
  }

  render() {
    const { className, children, ...props } = this.props

    return (
      <div
        className={classNames('floating-letters', className)}
        ref={this.ref}
        onMouseMove={this.mouseMove}
        {...props}
      >
        <svg
          className="floating-letters__letters"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
        >
          {LETTERS.map(path => <path className="floating-letters__letter" key={path} d={path} />)}
        </svg>
        {children}
      </div>
    )
  }
}

export default Background
