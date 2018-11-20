import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import none from './none'

const childFactoryCreator = props => child => React.cloneElement(child, props)

const PageTransition = ({ transition, duration, pageKey, component, children, ...props }) => (
  <TransitionGroup
    component={component}
    childFactory={childFactoryCreator({ classNames: transition, timeout: duration })}
  >
    <CSSTransition key={pageKey} timeout={duration} {...props}>
      {children || <div />}
    </CSSTransition>
  </TransitionGroup>
)

PageTransition.propTypes = {
  transition: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  pageKey: PropTypes.string.isRequired,
}

PageTransition.defaultProps = {
  ...none,
  component: 'div',
}

export default PageTransition
