import React from 'react'
import styled from 'styled-components'

const LETTERS = [
  'M87.1,182.5v95.9H26.5V61.7l125.2,98.8V64.6h60.8v216.7L87.1,182.5z',
  'M261.8,186.6h85.5v52.2H167.4l92-161.5h-81V25.2h174.8L261.8,186.6z',
  'M189.9,337h-62V123.3h62V337z',
  'M237.8,161.1h135.6v52.2h-73.6v31.8h62v50.8h-62v78.9h-62V161.1z',
]

const Container = styled.div`
  background: ${({ theme }) => theme.gradients.primary};
  position: relative;
`

const Letters = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .letter {
    fill: white;
    opacity: 0.12;
    filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.15));
    transition: transform 0.3s ease-out;
  }
`

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
    Array.from(this.el.querySelectorAll('.letter')).forEach((letter, i) => {
      const d = (i + 2) * -5
      letter.style.transform = `translate3d(${this.x * d}px, ${this.y * d}px, 0)`
    })
  }

  render() {
    const { children, ...props } = this.props

    return (
      <Container ref={this.ref} onMouseMove={this.mouseMove} {...props}>
        <Letters viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
          {LETTERS.map(path => <path className="letter" key={path} d={path} />)}
        </Letters>
        {children}
      </Container>
    )
  }
}

export default styled(Background)``
