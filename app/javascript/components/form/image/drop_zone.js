import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'

class DropZone extends Component {
  static propTypes = {
    status: PropTypes.oneOf(['ready', 'waiting', 'uploading', 'finished', 'error']),
    progress: PropTypes.number,
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    status: 'ready',
    progress: 0,
    file: null,
  }

  fileInput = createRef()

  dragOver = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  dragEnter = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  dragLeave = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  drop = e => {
    e.preventDefault()
    e.stopPropagation()

    const { files } = e.dataTransfer

    if (this.accept(files)) {
      this.props.handleUpload(files)
    }
  }

  selected = e => {
    this.props.handleUpload(e.currentTarget.files)
  }

  ready() {
    const { status } = this.props
    return status === 'ready' || status === 'finished'
  }

  accept(fileList) {
    return this.ready() && fileList.length === 1 && fileList[0].type.match(/^image\//)
  }

  choose = () => {
    if (this.ready()) {
      this.fileInput.current.click()
    }
  }

  contents() {
    const { status, file } = this.props

    if (status === 'uploading') {
      return (
        <>
          <span>Uploading{file && ` ${file.name}`}…</span>
        </>
      )
    } else if (status === 'ready') {
      return (
        <>
          <span>Upload an image</span>
          <small>1920 &times; 1080 pixels</small>
        </>
      )
    } else {
      return null
    }
  }

  render() {
    const {
      status,
      file,
      progress,
      handleUpload,
      children,
      ...props
    } = this.props
    return (
      <div
        className="image-upload__dropzone"
        {...props}
        onDragOver={this.dragOver}
        onDragEnter={this.dragEnter}
        onDragLeave={this.dragLeave}
        onDrop={this.drop}
      >
        <div className="image-upload__button" onClick={this.choose}>
          {this.contents()}
        </div>
        <input
          ref={this.fileInput}
          type="file"
          accept="image/*"
          onChange={this.selected}
        />
        {children}
      </div>
    )
  }
}

export default DropZone
