import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import classNames from 'classnames'
import CommonProps from '../lib/common_props'
import ThemeContext from '../lib/theme_context'

const elementClassName = (blocks, element, modifier) =>
  classNames(
    blocks
      .filter(Boolean)
      .map(block => `${block}${element ? `__${element}` : ''}${ modifier ? `--${modifier}` : ''}`)
  )

const modalClassNames = (classes, element) => {
  const blocks = classes.filter(Boolean)
  return {
    base: elementClassName(blocks, element),
    afterOpen: elementClassName(blocks, element, 'opening'),
    beforeClose: elementClassName(blocks, element, 'closing'),
  }
}

class Modal extends React.Component {
  static propTypes = {
    className: CommonProps.className,
    theme: PropTypes.string,
  }

  static defaultProps = {
    className: undefined,
  }

  render() {
    const { className, theme, children, ...props } = this.props

    return (
      <ThemeContext.Consumer>
        {theme =>
          <ReactModal
            className={modalClassNames(['modal', className])}
            overlayClassName={modalClassNames(['modal', className], 'overlay')}
            overlayRef={node => node && node.setAttribute('data-theme', theme)}
            closeTimeoutMS={300}
            {...props}
          >
            {children}
          </ReactModal>
        }
      </ThemeContext.Consumer>
    )
  }
}

export default Modal
