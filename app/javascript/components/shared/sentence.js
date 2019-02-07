import React, { Children, Fragment } from 'react'
import PropTypes from 'prop-types'

const Sentence = ({ children, separator, final }) => {
  const count = Children.count(children)
  return (
    Children.map(children, (child, i) => (
      <Fragment key={i}>
        {(count > 1 && i === count - 1) ? (final || separator) : (i > 0) ? separator : undefined}
        {child}
      </Fragment>
    ))
  )
}

Sentence.propTypes = {
  separator: PropTypes.any,
  finalSeparator: PropTypes.any,
}

Sentence.defaultProps = {
  separator: ', ',
  final: ' and ',
}

export default Sentence
