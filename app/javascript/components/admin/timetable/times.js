import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { transition } from '../../../styles'

const Time = styled.span`
  display: block;
  padding-top: 2rem;
  line-height: 1rem;
  font-size: ${({ theme }) => theme.fonts.scale(-1)};
  color: ${({ theme }) => theme.colors.secondary};
  text-align: right;
  transition: ${transition('opacity', { duration: 'fast' })};

  &:first-of-type,
  &[aria-hidden="true"] {
    opacity: 0;
  }
`

const StyledTimes = styled.section`
  flex: 0 0 4.5em;
  padding-right: 1em;
  margin-top: 1em;
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
      threshold: 1.0,
      rootMargin: '-24px 0px 0px 0px',
    })
    Array.from(this.container.current.querySelectorAll('span'))
      .forEach(el => this.intersectionObserver.observe(el))
  }

  observe = (entries) => {
    entries.forEach(({ target, intersectionRatio }) => {
      target.setAttribute('aria-hidden', intersectionRatio < 1)
    })
  }

  render() {
    const { start, end } = this.props

    return (
      <StyledTimes ref={this.container}>
        {Array(end - start).fill(0).map((_, i) => i + start).map(hour => (
          <Time key={hour}>{(hour - 1) % 12 + 1} {(hour % 24) < 12 ? 'AM' : 'PM'}</Time>
        ))}
      </StyledTimes>
    )
  }
}

export default Times
