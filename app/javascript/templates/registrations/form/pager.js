import React, { cloneElement, useCallback, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { usePrevious } from 'lib/hooks'

const CLASS_NAMES = {
  left: {
    enter: 'page--left--enter',
    enterActive: 'page--left--enter-active',
    enterDone: 'page--left--enter-done',
    exit: 'page--left--exit',
    exitActive: 'page--left--exit-active',
    exitDone: 'page--left--exit-done',
  },
  right: {
    enter: 'page--right--enter',
    enterActive: 'page--right--enter-active',
    enterDone: 'page--right--enter-done',
    exit: 'page--right--exit',
    exitActive: 'page--right--exit-active',
    exitDone: 'page--right--exit-done',
  }
}

const Pager = ({ pageIndex, children }) => {
  const container = useRef()

  const previousPageIndex = usePrevious(pageIndex);

  const transition = useRef('left')

  const entered = useCallback(
    (node) => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      node.focus()
    },
    [],
  )

  return (
    <TransitionGroup
      ref={container}
      className="registration-form__pager"
      childFactory={(child) => {
        if (pageIndex !== previousPageIndex) {
          transition.current = pageIndex < previousPageIndex ? 'right' : 'left'
        }
        return cloneElement(child, { classNames: CLASS_NAMES[transition.current] })
      }}
    >
      <CSSTransition key={pageIndex} timeout={500} onEntered={entered}>
        <div className="registration-form__page">
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

Pager.propTypes = {
  pageIndex: PropTypes.number.isRequired,
}

export default Pager
