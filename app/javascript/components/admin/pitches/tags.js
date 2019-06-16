import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import CommonProps from '../../../lib/common_props'
import Tag from '../../shared/tag'

const Tags = ({ className, tags, selected, onSelect }) => {
  const clicked = useCallback((e) => {
    const { tag } = e.target.closest('.tag').dataset
    onSelect && onSelect(tag)
  }, [onSelect])

  return (
    <div className={classNames('tags', className)}>
      {tags.map(tag => (
        <Tag
          key={tag}
          selected={selected.includes(tag)}
          data-tag={tag}
          onClick={clicked}
        >
          {tag}
        </Tag>
      ))}
    </div>
  )
}

Tags.propTypes = {
  className: CommonProps.className,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired),
  selected: PropTypes.arrayOf(PropTypes.string.isRequired),
  onSelect: PropTypes.func,
}

Tags.defaultProps = {
  onSelect: null,
}

export default Tags
