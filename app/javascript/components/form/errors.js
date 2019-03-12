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
  from: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
}

export default Errors
