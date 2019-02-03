import React, { Component } from 'react'
import AutosizeInput from 'react-input-autosize'
import { IconField } from '../../form'

class Slug extends Component {
  state = {
    value: this.props.value
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (value !== prevProps.value) {
      this.setState({ value })
    }
  }

  changed = e => {
    this.props.onChange(e)
  }

  inputChanged = e => {
    const { value } = e.target
    this.setState({ value })
  }

  inputBlurred = e => {
    const { onChange, onBlur } = this.props
    onChange(e)
    onBlur && onBlur(e)
  }

  inputKeyPressed = e => {
    if (e.which === 13) {
      e.target.blur()
    } else if (e.which === 27) {
      this.setState({ value: this.props.value })
    }

    if (this.props.onKeyPress) {
      this.props.onKeyPress(e)
    }
  }

  render() {
    const { value } = this.state
    const { root, loading, onChange, onBlur, onKeyDown, ...props } = this.props

    return (
      <IconField icon="link" label="URL" loading={loading}>
        <div className="slug">
          <span className="slug__root">{root}</span>
          <AutosizeInput
            className="slug__input"
            {...props}
            value={value}
            onChange={this.inputChanged}
            onBlur={this.inputBlurred}
            onKeyDown={this.inputKeyPressed}
          />
        </div>
      </IconField>
    )
  }
}

export default Slug
