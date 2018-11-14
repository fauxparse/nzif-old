import React, { createRef } from 'react'
import styled from 'styled-components'
import mojs from 'mo-js'

const RippleContainer = styled.div`
  position: relative;
  overflow: hidden;

  > * {
    position: relative;
    z-index: 1;
  }

  > [data-name="mojs-shape"] {
    z-index: 0;
  }
`

class Ripple extends React.Component {
  // container = createRef()

  constructor(props) {
    super(props)
    this.container = this.props.forwardref || createRef()
  }

  ripple = (x, y) => {
    if (!this.playing) {
      const el = this.container.current
      const size = Math.max(el.offsetWidth, el.offsetHeight)
      const shape = new mojs.Shape({
        parent: this.container.current,
        shape: 'circle',
        fill: 'currentColor',
        opacity: { 0.15: 0 },
        left: x - el.offsetLeft,
        top: y - el.offsetTop,
        radius: size,
        scale: { 0: 1 },
        isShowEnd: false,
        isForce3d: true,
        duration: Math.max(500, 20 * Math.sqrt(size)),
        easing: mojs.easing.bezier(0.4, 0.0, 0.2, 1),
        onComplete: () => {
          shape.el.remove()
          this.playing = false;
        },
      })
      shape.play()
      this.playing = true
    }
  }

  mouseDown = (e) => {
    this.ripple(e.clientX, e.clientY)
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e)
    }
  }

  touchStart = (e) => {
    const touch = e.touches[0]
    this.ripple(touch.clientX, touch.clientY)
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e)
    }
  }

  render() {
    const { onMouseDown, onTouchStart, ...props } = this.props

    return (
      <RippleContainer
        ref={this.container}
        onMouseDown={this.mouseDown}
        onTouchStart={this.touchStart}
        {...props}
      >
        {this.props.children}
      </RippleContainer>
    )
  }
}

export default React.forwardRef((props, ref) => <Ripple {...props} forwardref={ref} />)
