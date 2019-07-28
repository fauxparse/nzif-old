import React from 'react'
import PropTypes from 'lib/proptypes'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import none from './none'

const childFactoryCreator = props => child => React.cloneElement(child, props)

const PageTransition = ({ transition, duration, pageKey, component, children, ...props }) => (
  <TransitionGroup
    appear
    component={component}
    childFactory={childFactoryCreator({ classNames: transition, timeout: duration })}
  >
    <CSSTransition key={pageKey} timeout={duration} {...props}>
      {children || <div />}
    </CSSTransition>
  </TransitionGroup>
)

PageTransition.propTypes = {
  component: PropTypes.component,
  transition: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  pageKey: PropTypes.string.isRequired
}

PageTransition.defaultProps = {
  ...none,
  component: 'div',
}

export default PageTransition
