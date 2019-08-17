import React, { cloneElement, useContext } from 'react'
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
  const { pageIndex } = useContext(RegistrationFormContext)

  const previousPageIndex = usePrevious(pageIndex);

  return (
    <TransitionGroup
      className="registration-form__pager"
      childFactory={child => cloneElement(child, {
        classNames: CLASS_NAMES[pageIndex < previousPageIndex ? 'right' : 'left']
      })}
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
