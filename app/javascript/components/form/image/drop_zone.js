import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const UploadButton = styled.div`${({ theme }) => css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${theme.colors.border};
  border-radius: ${theme.layout.borderRadius};
  color: ${theme.colors.secondary};
  cursor: pointer;
`}`

const Container = styled.div`
  position: relative;
  width: 16rem;
  height: 9rem;

  input[type="file"] {
    display: none;
  }
`

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
          <p>Uploading{file && ` ${file.name}`}…</p>
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
      <Container
        {...props}
        onDragOver={this.dragOver}
        onDragEnter={this.dragEnter}
        onDragLeave={this.dragLeave}
        onDrop={this.drop}
      >
        <UploadButton onClick={this.choose}>
          {this.contents()}
        </UploadButton>
        <input
          ref={this.fileInput}
          type="file"
          accept="image/*"
          onChange={this.selected}
        />
        {children}
      </Container>
    )
  }
}

export default DropZone
