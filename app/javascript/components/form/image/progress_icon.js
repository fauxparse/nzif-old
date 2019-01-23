import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { transition } from '../../../styles'

const CIRCUMFERENCE = 119.38;
const CHECK_PATH_LENGTH = 22.63;

const Container = styled.div`${({ theme }) => css`
  margin: -0.5rem 0.5rem -0.5rem -0.5rem;
  position: relative;
  color: ${theme.colors.icon};

  &::before {
    content: '';
    position: absolute;
    top: 0.625rem;
    right: 0.625rem;
    bottom: 0.625rem;
    left: 0.625rem;
    border: 0.125rem solid currentColor;
    border-radius: 0.125rem;
    transition: ${transition('all')};
  }

  svg {
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .progress {
    opacity: 0;
    stroke-dasharray: ${CIRCUMFERENCE};
  }

  .sun {
    transition: ${transition('all')};
  }

  .check {
    stroke-dasharray: ${CHECK_PATH_LENGTH};
    stroke-dashoffset: 0;
    transform: rotate(-180deg);
    transform-origin: 20.5px 21.5px;
    transition: ${transition('all')};
  }

  &[data-status="uploading"] {
    &::before {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 50%;
      opacity: 0.25;
    }

    .progress {
      opacity: 1;
    }

    .sun {
      transform: translate(3.5px, -16px);
      opacity: 0;
    }

    .check {
      opacity: 0;
      transform: rotate(0deg);
      stroke: ${theme.colors.text};
      stroke-dashoffset: ${CHECK_PATH_LENGTH};
      transition: ${transition('transform', 'opacity', 'stroke-dashoffset')},
        ${transition('stroke', { duration: 0, delay: 300 })};
    }
  }

  &[data-status="finished"] {
    &::before {
      transition: ${transition('all', { delay: 1000 })},
        ${transition('opacity', { duration: 0, easing: 'linear' })};
    }

    .progress {
      opacity: 0;
      transition: opacity 0ms linear 1000ms;
    }

    .check {
      opacity: 1;
      stroke-dashoffset: 0;
      transform: rotate(-180deg);
      transition: ${transition('stroke-dashoffset', { duration: 300, easing: 'accelerate' })},
        ${transition('transform', 'stroke', { delay: 1000 })};
    }

    .sun {
      transition: ${transition('opacity', { delay: 1300 })},
        ${transition('transform', { delay: 1300, easing: 'bounce' })};
    }
  }
`}`

const Percentage = styled.span`${({ theme }) => css`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  font-size: ${theme.fonts.size(-2)};
  color: ${theme.colors.text};
  line-height: 1.5em;
  margin: -0.75em 0;
  text-align: center;
`}`

class ProgressIcon extends Component {
  static propTypes = {
    status: PropTypes.oneOf(['ready', 'waiting', 'uploading', 'finished', 'error']),
    progress: PropTypes.number,
  }

  static defaultProps = {
    status: 'ready',
    progress: 0,
  }

  state = {
    started: new Date().valueOf(),
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if (status !== prevProps.status) {
      if (status === 'uploading') {
        this.setState({ started: new Date().valueOf() })
      }
    }
  }

  render() {
    const { progress, status, ...props } = this.props
    const { started } = this.state
    const elapsed = new Date().valueOf() - started
    let visibleProgress = ((elapsed > 300) ? progress : 0) / 100.0

    return (
      <Container {...props} data-status={status}>
        <svg viewBox="0 0 40 40">
          <path
            className="progress"
            d="M20,1a19,19 0 1,0 0,38a19,19 0 1,0 0,-38"
            style={{ strokeDashoffset: (visibleProgress - 1) * CIRCUMFERENCE }}
          />
          <circle className="sun" cx={16.5} cy={16.5} r={1.5} />
          <path className="check" d="M12,20.5l5,5 11,-11" />
        </svg>
        {status === 'uploading' && <Percentage>{Math.round(progress)}%</Percentage>}
      </Container>
    )
  }
}

export default ProgressIcon
