import React from 'react'
import Error from './error'

const Errors = ({ from, name }) => (
  <>
    {(from && from[name] || [])
      .map(message => <Error key={message}>{message}</Error>)
    }
  </>
)

export default Errors
