import React from 'react'
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

export default class Ripple extends React.Component {
  ripple = (e) => {
    const size = Math.max(this.el.offsetWidth, this.el.offsetHeight)
    const shape = new mojs.Shape({
      parent: this.el,
      shape: 'circle',
      fill: 'currentColor',
      opacity: { 0.15: 0 },
      left: e.clientX - this.el.offsetLeft,
      top: e.clientY - this.el.offsetTop,
      radius: size,
      scale: { 0: 1 },
      isShowEnd: false,
      isForce3d: true,
      duration: Math.max(500, 20 * Math.sqrt(size)),
      easing: mojs.easing.bezier(0.4, 0.0, 0.2, 1),
      onComplete: () => shape.el.remove(),
    })
    shape.play()
  }

  mouseDown = (e) => {
    this.ripple(e)
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e)
    }
  }

  touchStart = (e) => {
    this.ripple(e)
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e)
    }
  }

  render() {
    const { onMouseDown, onTouchStart, ...props } = this.props
    return (
      <RippleContainer
        ref={el => this.el = el}
        onMouseDown={this.mouseDown}
        onTouchStart={this.touchStart}
        {...props}
      >
        {this.props.children}
      </RippleContainer>
    )
  }
}
