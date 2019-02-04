import React from 'react'
import PropTypes from 'prop-types'

const MenuItem = ({ label, selected, selectedText }) => (
  <li className="autocomplete__menu-item" aria-selected={selected || undefined}>
    <span className="autocomplete__highlight">
      <mark>{label.substring(0, selectedText.length)}</mark>{label.substring(selectedText.length)}
    </span>
  </li>
)

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  selectedText: PropTypes.string.isRequired,
}

export default MenuItem
