import React from 'react'
import styled from 'styled-components'
import mojs from 'mo-js'

const RippleContainer = styled.div`
  position: relative;
`

class Ripple extends React.Component {
  ripple = (e) => {
    const shape = new mojs.Shape({
      parent: this.el,
      shape: 'circle',
      fill: 'white',
      fillOpacity: { 0.25: 0 },
      left: e.clientX,
      top: e.clientY,
      radius: Math.max(this.el.offsetWidth, this.el.offsetHeight),
      scale: { 0: 1 },
      isShowEnd: false,
      isForce3d: true,
      onComplete: () => shape.el.remove(),
    })
    shape.play()
  }

  render() {
    return (
      <RippleContainer
        ref={el => this.el = el}
        className={this.props.className}
        onMouseDown={this.ripple}
        onTouchStart={this.ripple}
      >
        {this.props.children}
      </RippleContainer>
    )
  }
}

export default styled(Ripple)``
