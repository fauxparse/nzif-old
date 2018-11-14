// https://medium.com/lalilo/dynamic-transitions-with-react-router-and-react-transition-group-69ab795815c9

import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import none from './none'

// the childFactory allows to change the transition of the leaving component
// https://github.com/reactjs/react-transition-group/issues/182
const childFactoryCreator = props => child => React.cloneElement(child, props)

const PageTransition = ({ transition, duration, pageKey, children }) => (
  <TransitionGroup
    childFactory={childFactoryCreator({ classNames: transition, timeout: duration })}
  >
    <CSSTransition key={pageKey} timeout={duration}>
      {children || <div />}
    </CSSTransition>
  </TransitionGroup>
)

PageTransition.defaultProps = { none }

export default PageTransition
