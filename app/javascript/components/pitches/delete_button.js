import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button'

const DeleteButton = ({ onClick }) => {
  return (
    <Button
      icon="trash"
      text="Delete"
      onClick={onClick}
    />
  )
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default DeleteButton
