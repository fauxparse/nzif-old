import React from 'react'
import PropTypes from 'prop-types'
import { Textarea } from '../../form'

const Editor = ({ value, onChange }) => {
  return (
    <div className="content__editor">
      <Textarea className="content__textarea" value={value} onChange={onChange} />
    </div>
  )
}

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Editor
