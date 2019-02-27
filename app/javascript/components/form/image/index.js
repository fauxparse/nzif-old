import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DirectUploadProvider } from 'react-activestorage-provider'
import classNames from 'classnames'
import CommonProps from '../../../lib/common_props'
import DropZone from './drop_zone'
import ProgressIcon from './progress_icon'
import Preview from './preview'
import ClearButton from './clear_button'

class ImageUpload extends Component {
  static propTypes = {
    className: CommonProps.className,
    image: PropTypes.shape({
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      full: PropTypes.string.isRequired,
    }),
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    image: null,
    width: 1920,
    height: 1080,
  }

  state = {
    status: 'ready',
    key: new Date().valueOf(),
  }

  start = ({ file }) => {
    this.setState({
      file,
      status: 'uploading',
      started: new Date().valueOf(),
    })
  }

  uploaded = ([blobId]) => {
    const delay = new Date().valueOf() - this.state.started
    this.timeout = setTimeout(this.finished(blobId), Math.max(500 - delay, 0))
  }

  finished = blobId => () => {
    this.setState({ status: 'finished' })
    this.props.onChange(blobId)
  }

  clear = () => {
    clearTimeout(this.timeout)
    this.setState({ status: 'ready', file: null, key: new Date().valueOf() })
    this.props.onChange(null)
  }

  render() {
    const { image, className, children } = this.props
    const { status, file: uploaded, key } = this.state

    return (
      <DirectUploadProvider
        key={key}
        onSuccess={this.uploaded}
        onBeforeBlobRequest={this.start}
        render={({ uploads, handleUpload }) => {
          const { state = status, file = image, progress = 0 } = uploads[0] || {}
          const showPreview = state !== 'uploading' && state !== 'waiting'
          return (
            <div className={classNames('image-upload', className)}>
              <ProgressIcon status={status} progress={progress} onClick={this.toggle} />
              <DropZone
                status={state}
                file={file}
                progress={progress}
                instructions={children}
                handleUpload={handleUpload}
              >
                <Preview file={showPreview ? (file || uploaded) : null} />
                {showPreview && (file || uploaded) && <ClearButton onClick={this.clear} />}
              </DropZone>
            </div>
          )
        }}
      />
    )
  }
}

export default ImageUpload
