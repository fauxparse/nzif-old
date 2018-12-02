import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { transition } from '../../../styles'

const Time = styled.span`
  display: block;
  line-height: 1rem;
  padding-top: 2rem;
  padding-right: 1em;
  font-size: ${({ theme }) => theme.fonts.scale(-1)};
  color: ${({ theme }) => theme.colors.secondary};
  text-align: right;
  white-space: nowrap;
  transition: ${transition('opacity', { duration: 'fast' })};

  &:first-of-type,
  &[aria-hidden="true"] {
    opacity: 0;
  }
`

const StyledTimes = styled.aside`
  flex: 0 0 4.5em;
  padding-top: 1em;
  align-self: stretch;
`

class Times extends React.Component {
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }

  static defaultProps = {
    start: 9,
    end: 27,
  }

  container = React.createRef()

  componentDidMount() {
    this.intersectionObserver = new IntersectionObserver(this.observe, {
      threshold: [0, 1],
      rootMargin: '-56px 0px 0px 0px',
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
    const { start, end, ...props } = this.props

    return (
      <StyledTimes ref={this.container} {...props}>
        {Array(end - start).fill(0).map((_, i) => i + start).map(hour => (
          <Time key={hour}>{(hour - 1) % 12 + 1} {(hour % 24) < 12 ? 'AM' : 'PM'}</Time>
        ))}
      </StyledTimes>
    )
  }
}

export default Times
