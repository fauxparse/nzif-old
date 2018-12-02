import React from 'react'
import styled, { css } from 'styled-components'
import { transition } from '../../../styles'
import Context from './context'

const Time = styled.span`
  display: block;
  line-height: 1rem;
  padding-right: 1em;
  font-size: ${({ theme }) => theme.fonts.scale(-1)};
  color: ${({ theme }) => theme.colors.secondary};
  text-align: right;
  white-space: nowrap;
  transition: ${transition('opacity', { duration: 100 })};

  &:first-of-type,
  &[aria-hidden="true"] {
    opacity: 0;
  }
`

const StyledTimes = styled.aside`${({ scale, granularity }) => css`
  flex: 0 0 4.5em;
  padding-top: 2em;
  align-self: stretch;

  ${Time} {
    padding-top: ${scale * granularity - 1}rem;
  }
`}`

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
      <StyledTimes ref={this.container} scale={scale} granularity={granularity} {...this.props}>
        {Array(end - start).fill(0).map((_, i) => i + start).map(hour => (
          <Time key={hour}>{(hour - 1) % 12 + 1} {(hour % 24) < 12 ? 'AM' : 'PM'}</Time>
        ))}
      </StyledTimes>
    )
  }
}

export default Times
