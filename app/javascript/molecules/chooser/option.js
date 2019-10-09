import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import List from 'molecules/list'

const Option = ({ className, option, highlight, ...props }) => (
  <List.Item
    className={classNames(
      'chooser__option',
      highlight && 'chooser__option--highlight',
      className,
    )}
    {...props}
  >
    {option.label}
  </List.Item>
)

Option.propTypes = {
  option: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
  highlight: PropTypes.bool,
}

Option.defaultProps = {
  highlight: false,
}

export default Option
