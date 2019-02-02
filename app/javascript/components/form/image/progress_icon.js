import React, { Component } from 'react'
import PropTypes from 'prop-types'

const CIRCUMFERENCE = 119.38

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
      <span className="image-upload__progress-icon" {...props} data-status={status}>
        <svg viewBox="0 0 40 40">
          <path
            className="image-upload__progress"
            d="M20,1a19,19 0 1,0 0,38a19,19 0 1,0 0,-38"
            style={{ strokeDashoffset: (visibleProgress - 1) * CIRCUMFERENCE }}
          />
          <circle className="image-upload__sun" cx={16.5} cy={16.5} r={1.5} />
          <path className="image-upload__check" d="M12,20.5l5,5 11,-11" />
        </svg>
        {status === 'uploading' && <span className="image-upload__percentage">{Math.round(progress)}%</span>}
      </span>
    )
  }
}

export default ProgressIcon
