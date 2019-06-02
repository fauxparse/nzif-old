import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MDReactComponent from 'markdown-react-js'
import TextLink from './text_link'
import CommonProps from '../../lib/common_props'

const handleIterate = (Tag, tagProps, children, _level) => {
  if (Tag === 'a') {
    const { href, rel, target, ...rest } = tagProps
    return (
      <TextLink to={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </TextLink>
    )
  }

  return <Tag {...tagProps}>{children}</Tag>
}

const Markdown = ({ className, component = 'div', text, ...props }) => (
  <MDReactComponent
    className={classNames('markdown', className)}
    text={text}
    tags={{ html: component }}
    onIterate={handleIterate}
    markdownOptions={{ typographer: true }}
    {...props}
  />
)

Markdown.propTypes = {
  component: PropTypes.string,
  text: PropTypes.string.isRequired,
  className: CommonProps.className,
}

Markdown.defaultProps = {
  className: null,
}

export default Markdown
