import React from 'react'
import PropTypes from 'lib/proptypes'
import List from 'molecules/list'
import classNames from 'classnames'
import Ripple from 'effects/ripple'

const Option = ({ id, label, selected, highlight, onClick, ...props }) => {
  const clicked = () => onClick(id)

  return (
    <List.Item
      className={classNames(
        'select__option',
        selected && 'select__option--selected',
        highlight && 'select__option--highlight',
      )}
      primary={label}
      role="menuitem"
      {...props}
      data-id={id}
      onClick={clicked}
    >
      <Ripple />
    </List.Item>
  )
}

Option.propTypes = {
  id: PropTypes.id.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  highlight: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

Option.defaultProps = {
  selected: false,
  highlight: false,
}

export default Option
