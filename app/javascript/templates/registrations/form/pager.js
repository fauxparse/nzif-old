import React, { cloneElement, useContext, useRef } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { usePrevious } from 'lib/hooks'
import RegistrationFormContext from './context'

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

const Pager = ({ children }) => {
  const container = useRef()

  const { pageIndex } = useContext(RegistrationFormContext)

  const previousPageIndex = usePrevious(pageIndex);

  const transition = useRef('left')

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
      <CSSTransition
        key={pageIndex}
        timeout={500}
      >
        <div className="registration-form__page">
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default Pager