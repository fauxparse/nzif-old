import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { DirectUploadProvider } from 'react-activestorage-provider'
import { v4 as uuid } from 'uuid'
import Button, { StyledButton } from '../../button'
import { IconField } from '../../form'
import UploadButton from './upload_button'

const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
`

const FileInputLabel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

const ImageUploadContainer = styled.div``

const ThumbnailContainer = styled.div`${({ theme }) => css`
  display: inline-block;
  border-radius: ${theme.layout.borderRadius};
  overflow: hidden;
  position: relative;

  img {
    display: block;
    height: 6em;
    width: auto;
  }
`}`

class ImageUpload extends Component {
  static propTypes = {
    image: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired,
    }),
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    image: null,
    id: uuid(),
  }

  uploaded = ([id, ..._]) => {
    this.props.onChange(id)
  }

  clear = (e) => {
    e && e.preventDefault()
    this.props.onChange(null)
  }

  render() {
    const { image, id } = this.props

    return (
      <ImageUploadContainer>
        <DirectUploadProvider
          render={({ ready, uploads, handleUpload }) => {
            const upload = { file: image, ...uploads[uploads.length - 1] }
            return (
              <FileInputLabel>
                <UploadButton
                  as="label"
                  htmlFor={id}
                  label="Upload a photo"
                  onClear={this.clear}
                  {...upload}
                />
                <FileInput
                  id={id}
                  accept="image/*"
                  disabled={!ready}
                  onChange={e => handleUpload(e.currentTarget.files)}
                />
              </FileInputLabel>
            )
          }}
          onSuccess={this.uploaded}
        />
      </ImageUploadContainer>
    )
  }
}

export default ImageUpload
