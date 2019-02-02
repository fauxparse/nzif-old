import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'


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
      <div className="image-upload__preview">
        <TransitionGroup exit={false} component={null}>
          {src &&
            <CSSTransition timeout={300} classNames="drop">
              <Image src={src} />
            </CSSTransition>
          }
        </TransitionGroup>
      </div>
    )
  }
}

export default Preview
