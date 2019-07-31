import React, { Children, Fragment } from 'react'
import PropTypes from 'prop-types'

const Sentence = ({ children, separator, pair, final }) => {
  const count = Children.count(children)
  const last = (count === 2 && pair) || final

  return (
    Children.map(children, (child, i) => (
      <Fragment key={i}>
        {(count > 1 && i === count - 1) ? (last || separator) : (i > 0) ? separator : undefined}
        {child}
      </Fragment>
    ))
  )
}

Sentence.propTypes = {
  separator: PropTypes.any,
  final: PropTypes.any,
  pair: PropTypes.any,
}

Sentence.defaultProps = {
  separator: ', ',
  final: ', and ',
  pair: ' and ',
}

export default Sentence
