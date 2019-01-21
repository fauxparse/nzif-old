import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import transition from '../../../styles/transition'
import Tooltip from '../../shared/tooltip'
import Icon from '../../icons'

const CIRCUMFERENCE = 119.38;
const CLOUD_PATH_LENGTH = 43.37;
const CHECK_PATH_LENGTH = 22.63;

const ProgressIcon = styled.div`${({ theme }) => css`
  flex: 0 0 2.5em;
  margin: 0 1.5rem 0 -3rem;
  position: relative;
  color: ${theme.colors.icon};

  svg {
    display: block;
    position: relative;
    fill: none;
    stroke: currentColor;
    stroke-width: 2px;
    stroke-linejoin: round;
    stroke-linecap: round;
    width: 2.5em;
    height: 2.5em;
  }

  .progress {
    stroke: ${theme.colors.accent};
    stroke-dasharray: ${CIRCUMFERENCE};
    stroke-dashoffset: -${CIRCUMFERENCE};
    opacity: 0;
    transition: ${transition('stroke-dashoffset')};
  }

  .cloud {
    stroke-dasharray: ${CLOUD_PATH_LENGTH} 100;
    transition: ${transition('stroke-dasharray', 'stroke-dashoffset')};
  }

  .arrow {
    transition: ${transition('transform', { easing: 'accelerate', duration: 50 })};
  }

  .check {
    stroke-dasharray: ${CHECK_PATH_LENGTH};
    stroke-dashoffset: ${CHECK_PATH_LENGTH};
    opacity: 0;
    transition: ${transition('stroke-dashoffset', { easing: 'accelerate' })};
  }

  .sun {
    opacity: 0;
    transform: translateY(-8px);
  }

  text {
    font-size: ${theme.fonts.size(-2)};
    stroke: none;
    fill: currentColor;
    opacity: 0;
    transition: ${transition('opacity')};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    border: 0.125em solid ${theme.colors.accent};
    border-radius: 50%;
    display: none;
  }
`}`

const Label = styled.span`${({ theme }) => css`
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${theme.colors.secondary};
`}`

const Clear = styled.span`
  padding: 0.75rem;

  svg {
    display: block;
    font-size: 1rem;
  }
`

const Button = styled.button`${({ theme }) => css`
  border: 0;
  box-shadow: none;
  background: none;
  display: flex;
  align-items: center;
  outline: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  margin-bottom: 1.5rem;

  &:active {
    .arrow {
      transform: translateY(0.25rem);
      transition: ${transition('transform')};
    }

    .cloud {
      stroke-dasharray: 0 100;
      stroke-dashoffset: -${CLOUD_PATH_LENGTH / 2};
    }
  }

  &[aria-busy] {
    .cloud {
      stroke-dasharray: 0 100;
      stroke-dashoffset: -${CLOUD_PATH_LENGTH / 2};
      transform: translateY(-11px);
      opacity: 0;
      transition: ${transition('transform', 'opacity', { duration: 'fast' })};
    }

    .progress {
      opacity: 1;
    }

    .arrow {
      transform: translateY(-100%);
      opacity: 0;
      transition: ${transition('transform', 'opacity')};
    }

    text {
      opacity: 1;
    }
  }

  &[data-state="finished"],
  &[data-state="uploaded"] {
    .check {
      opacity: 1;
      stroke-dashoffset: 0;
      transition: ${transition('stroke-dashoffset', { easing: 'accelerate', delay: 150 })};
    }

    .cloud,
    .arrow,
    .progress {
      display: none;
    }

    ${ProgressIcon}::before {
      display: block;
    }
  }

  &[data-state="uploaded"] {
    .check {
      transform: rotate(180deg);
      transition: ${transition('transform')};
      transform-origin: 20.5px 21.5px;
    }

    .sun {
      opacity: 1;
      transform: translateY(0);
      transition: ${transition('opacity')}, ${transition('transform', { easing: 'cubic-bezier(0.5, 2, 0.5, 1)' })};
      transition-delay: 300ms;
    }

    ${ProgressIcon}::before {
      border-color: currentColor;
      border-radius: 2px;
      top: 0.625em;
      right: 0.625em;
      bottom: 0.625em;
      left: 0.625em;
      transition: ${transition('all')};
    }
  }
`}`

class UploadButton extends Component {
  static propTypes = {
    state: PropTypes.oneOf(['ready', 'waiting', 'uploading', 'finished']),
    progress: PropTypes.number,
    file: PropTypes.shape({ name: PropTypes.string.isRequired }),
    onClick: PropTypes.func,
    onClear: PropTypes.func,
  }

  static defaultProps = {
    state: 'ready',
    progress: 0,
    file: undefined,
    onClick: () => {},
    onClear: () => {},
  }

  state = {
    uploaded: !!this.props.file,
    file: this.props.file,
  }

  progressCircle = createRef()

  componentDidUpdate(prevProps, prevState) {
    const { state, file } = this.props

    if (file && !prevState.file) {
      this.setState({ file })
    }

    if (state !== prevProps.state) {
      if (state === 'uploading') {
        this.setState({ uploaded: false })
      }
      if (state === 'finished') {
        this.finished = setTimeout(() => this.setState({ uploaded: true }), 1000)
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.finished)
  }

  uploadStatus() {
    const { state } = this.props
    const { uploaded, file } = this.state
    return uploaded ? 'uploaded' : (state === 'ready' && file) ? 'finished' : state
  }

  label(state) {
    const { file, uploaded } = this.state
    switch(this.uploadStatus()) {
      case 'waiting':
      case 'uploading':
        return 'Uploading…'
      case 'finished':
        return 'Complete'
      case 'uploaded':
        return file ? file.name : '(no file)'
      case 'error':
        return 'Error uploading file'
      default:
        return 'Upload a file'
    }
  }

  clicked = (e) => {
    const { onClick } = this.props
    const { uploaded } = this.state

    if (uploaded) {
      e.preventDefault()
    } else {
      onClick(e)
    }
  }

  clear = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ file: null, uploaded: false })
    this.props.onClear()
  }

  render() {
    const { state, progress, label, onClick, onClear, ...props } = this.props
    const { uploaded, file } = this.state
    const actualState = uploaded ? 'uploaded' : (state === 'ready' && file) ? 'finished' : state

    return (
      <Button
        data-state={actualState}
        aria-busy={state === 'uploading' || undefined}
        onClick={this.clicked}
        {...props}
      >
        <ProgressIcon>
          <Tooltip title={label}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
              <path
                ref={this.progressCircle}
                className="progress" d="M20,1a19,19 0 1,0 0,38a19,19 0 1,0 0,-38"
                style={{ strokeDashoffset: ((progress / 100.0) - 1) * CIRCUMFERENCE }}
              />
              <path className="cloud" d="M11,24.3A8,8 0 1 1 24.74,17h1.26A5,5 0 0 1 28.39,26.39" />
              <g className="arrow">
                <path className="head" d="M16,24l4,-4 4,4" />
                <path className="shaft" d="M20,20v9" />
              </g>
              <path className="check" d="M12,20.5l5,5 11,-11" />
              <path className="sun" d="M15,16.5a1.5,1.5 0 1,0 3,0a1.5,1.5 0 1,0 -3,0" />
              <text x={20} y={24} textAnchor="middle">
                {Math.round(progress)}%
              </text>
            </svg>
          </Tooltip>
        </ProgressIcon>
        <Label>
          {this.label(actualState)}
        </Label>
        {uploaded && <Clear onClick={this.clear}><Icon name="close" /></Clear>}
      </Button>
    )
  }
}

export default UploadButton
