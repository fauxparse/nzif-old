import React, { Children, cloneElement, useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Section from './section'

import './index.scss'

const Accordion = ({ className, selected, exclusive, children, onChange, ...props }) => {
  const sectionToggled = useCallback((name) => {
    if (name === selected) {
      onChange(null)
    } else {
      onChange(name)
    }
  }, [onChange, selected])

  return (
    <div className={classNames('accordion', className)} {...props}>
      {Children.map(children, child => (
        child.type === Section
          ? cloneElement(child, {
              open: selected === child.props.name,
              onToggle: sectionToggled,
            })
          : child
      ))}
    </div>
  )
}

Accordion.propTypes = {
  exclusive: PropTypes.bool,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

Accordion.defaultProps = {
  exclusive: true,
  selected: null,
}

Accordion.Section = Section

export default Accordion