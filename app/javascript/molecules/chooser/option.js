import React from 'react'
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

export default Option
