import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'molecules/markdown'

const Preview = ({ text }) => (
  <Markdown className="static-content content__preview" text={text} />
)

Preview.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Preview
