import React, { useContext } from 'react'
import ReactModal from 'react-modal'
import classNames from 'classnames'
import ThemeContext from 'lib/theme_context'

import './index.scss'

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

const Modal = ({ className, children, ...props }) => {
  const theme = useContext(ThemeContext)

  return (
    <ReactModal
      className={modalClassNames(['modal', className])}
      overlayClassName={modalClassNames(['modal', className], 'overlay')}
      bodyOpenClassName="body--modal-open"
      overlayRef={node => node && node.setAttribute('data-theme', theme)}
      closeTimeoutMS={300}
      {...props}
    >
      {children}
    </ReactModal>
  )
}

export default Modal
