import React from 'react'
import PropTypes from 'prop-types'
import Error from './error'

const Errors = ({ from, name }) => (
  <>
    {(from && from[name] || [])
      .map(message => <Error key={message}>{message}</Error>)
    }
  </>
)

Errors.propTypes = {
  from: PropTypes.object,
  name: PropTypes.string.isRequired,
}

Errors.defaultProps = {
  from: {},
}

export default Errors
