import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import AutosizeInput from 'react-input-autosize'
import { IconField } from '../../form'

const SlugRoot = styled.span`${({ theme }) => css`
  flex: 0 1 auto;
  color: ${theme.colors.secondary};
  padding: 0.25rem 0;
  direction: rtl;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::before { content: '/'; }
`}`

const SlugInput = styled(AutosizeInput)`${({ theme }) => css`
  input {
    appearance: none;
    background: transparent;
    border: 0;
    border-bottom: 1px solid ${theme.colors.border};
    box-shadow: none;
    color: inherit;
    display: block;
    font: inherit;
    line-height: ${theme.fonts.lineHeight};
    margin: 0;
    padding: 0.25rem 0 calc(0.25rem - 1px);
    width: 100%;
    max-width: 100%;
    min-width: 4em;

    &:focus {
      outline: none;
      border-bottom-color: ${theme.colors.accent};
    }

    &:disabled {
      opacity: 0.5;
    }
  }
`}`

const SlugContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.5rem;
  min-height: 2.5rem;
  max-width: 100%;
  overflow: hidden;
`

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
        <SlugContainer>
          <SlugRoot>{root}</SlugRoot>
          <SlugInput
            {...props}
            value={value}
            onChange={this.inputChanged}
            onBlur={this.inputBlurred}
            onKeyDown={this.inputKeyPressed}
          />
        </SlugContainer>
      </IconField>
    )
  }
}

export default Slug
