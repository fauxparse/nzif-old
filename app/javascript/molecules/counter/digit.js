import React from 'react'
import PropTypes from 'lib/proptypes'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const Digit = ({ digit }) => (
  <TransitionGroup component="span" className="counter__slot">
    <CSSTransition key={digit} classNames="counter__digit-" timeout={300}>
      <span className="counter__digit">{digit}</span>
    </CSSTransition>
  </TransitionGroup>
)

Digit.propTypes = {
  digit: PropTypes.string.isRequired
}

export default Digit
