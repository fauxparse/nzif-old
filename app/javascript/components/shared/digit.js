import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const Digit = ({ number }) => {
  return (
    <TransitionGroup className="digit" component="span">
      <CSSTransition key={number} timeout={500} classNames="digit__number-">
        <span className="digit__number">
          <span className="digit__top">{number % 10}</span>
          <span className="digit__bottom" aria-hidden>{number % 10}</span>
        </span>
      </CSSTransition>
    </TransitionGroup>
  )
}

Digit.propTypes = {
  number: PropTypes.number.isRequired,
};

export default Digit
