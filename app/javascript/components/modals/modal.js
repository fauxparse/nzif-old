import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import classNames from 'classnames'
import { withTheme } from 'styled-components'
import { DURATION } from '../../styles/transition'

const elementClassName = (blocks, element, modifier) =>
  classNames(
    blocks
      .filter(x => x)
      .map(block => `${block}${element ? `__${element}` : ''}${ modifier ? `--${modifier}` : ''}`)
  )

const modalClassNames = (classNames, element) => {
  const blocks = classNames.filter(x => x)
  return {
    base: elementClassName(blocks, element),
    afterOpen: elementClassName(blocks, element, 'opening'),
    beforeClose: elementClassName(blocks, element, 'closing'),
  }
}

class Modal extends React.Component {
  render() {
    const { className, theme, children, ...props } = this.props

    return (
      <ReactModal
        className={modalClassNames(['modal', className])}
        overlayClassName={modalClassNames(['modal', className], 'overlay')}
        closeTimeoutMS={DURATION.standard}
        style={{
          content: {
            color: theme.colors.foreground,
            backgroundColor: theme.colors.modalBackground,
          }
        }}
        {...props}
      >
        {children}
      </ReactModal>
    )
  }
}

export default withTheme(Modal)
