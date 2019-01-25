import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { transition } from '../../../styles'

const Container = styled.div`${({ theme }) => css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${theme.layout.borderRadius};
  pointer-events: none;
  touch-action: none;

  img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    border-radius: ${theme.layout.borderRadius};

    &.drop-enter {
      transform: translateY(-100%);
      opacity: 0;
    }

    &.drop-enter-active {
      transform: translateY(0);
      opacity: 1;
      transition: ${transition('transform', { easing: 'bounce' })},
        ${transition('opacity')};
    }
  }
`}`

class Image extends Component {
  static propTypes = {
    src: PropTypes.any.isRequired,
  }

  image = createRef()

  componentDidMount() {
    this.image.current.src = this.props.src
  }

  render() {
    const { src, ...props } = this.props
    return <img {...props} ref={this.image} />
  }
}

class Preview extends Component {
  static propTypes = {
    file: PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        slice: PropTypes.func.isRequired,
      }),
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
      }),
    ]),
  }

  static defaultProps = {
    file: null,
  }

  state = {
    src: this.props.file && this.props.file.thumbnail || null,
  }

  componentDidUpdate(prevProps) {
    const { file } = this.props

    if (file !== prevProps.file) {
      if (file) {
        if (file.thumbnail) {
          this.setState({ src: file.thumbnail })
        } else {
          const reader = new FileReader()
          reader.onload = e => this.setState({ src: e.target.result })
          reader.readAsDataURL(file)
        }
      } else {
        this.setState({ src: null })
      }
    }
  }

  render() {
    const { src } = this.state
    return (
      <TransitionGroup exit={false} component={Container}>
        {src &&
          <CSSTransition timeout={300} classNames="drop">
            <Image src={src} />
          </CSSTransition>
        }
      </TransitionGroup>
    )
  }
}

export default Preview
