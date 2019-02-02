import React, { createRef } from 'react'
import classNames from 'classnames'
import mojs from 'mo-js'
import CommonProps from '../../../lib/proptypes'

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

const transformCoordinates = (element) => {
  const style = getComputedStyle(element)
  if (style.transform) {
    const m = style.transform.match(/matrix(?:3d)?\(([^)]+)\)/)
    if (m) {
      const values = m[1].split(',').map(v => parseFloat(v.trim()))
      values.splice(0, values.length === 16 ? 12 : 4)
      return {
        x: values[0],
        y: values[1],
        z: values[2] || 0,
      }
    }
  }

  return { x: 0, y: 0 }
}

class Ripple extends React.Component {
  static propTypes = {
    as: CommonProps.component,
  }

  static defaultProps = {
    as: 'div',
  }

  constructor(props) {
    super(props)
    this.container = this.props.forwardref || createRef()
  }

  ripple = (x, y) => {
    if (!this.playing) {
      const el = this.container.current
      const size = Math.max(el.offsetWidth, el.offsetHeight)
      const { x: left, y: top } = trueClientPosition({ x, y }, el)
      const shape = new mojs.Shape({
        parent: this.container.current,
        shape: 'circle',
        opacity: { 0.15: 0 },
        left,
        top,
        fill: 'currentColor',
        radius: size,
        scale: { 0: 1 },
        isShowEnd: false,
        isForce3d: true,
        duration: Math.max(500, 50 * Math.sqrt(size)),
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
    const {
      as: Container,
      className,
      forwardref,
      onMouseDown,
      onTouchStart,
      ...props
    } = this.props

    return (
      <Container
        ref={this.container}
        className={classNames('ripple', className)}
        onMouseDown={this.mouseDown}
        onTouchStart={this.touchStart}
        {...props}
      >
        {this.props.children}
      </Container>
    )
  }
}

export default React.forwardRef((props, ref) => <Ripple {...props} forwardref={ref} />)
