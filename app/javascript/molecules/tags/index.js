import React, { useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames';
import Tag from 'atoms/tag'

import './index.scss'

const Tags = ({ className, tags, selected, exclusive, onChange }) => {
  const clicked = useCallback((e) => {
    const { tag } = e.target.closest('.tag').dataset
    if (exclusive) {
      if (onChange && selected.indexOf(tag) < 0) {
        onChange([tag])
      }
    } else if (onChange) {
      if (selected.indexOf(tag) < 0) {
        onChange([...selected, tag])
      } else {
        onChange(selected.filter(t => t !== tag))
      }
    }
  }, [selected, onChange, exclusive])

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
  className: PropTypes.className,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired),
  selected: PropTypes.arrayOf(PropTypes.string.isRequired),
  exclusive: PropTypes.bool,
  onChange: PropTypes.func,
}

Tags.defaultProps = {
  exclusive: false,
  selected: [],
  onChange: null,
}

export default Tags
