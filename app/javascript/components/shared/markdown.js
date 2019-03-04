import React from 'react'
import PropTypes from 'prop-types'
import MDReactComponent from 'markdown-react-js'
import TextLink from './text_link'

const handleIterate = (Tag, props, children, _level) => {
  if (Tag === 'a') {
    const { href, rel, target, ...rest } = props
    return (
      <TextLink to={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </TextLink>
    )
  }

  return <Tag {...props}>{children}</Tag>
}

const Markdown = ({ component = 'div', text, ...props }) => (
  <MDReactComponent
    text={text}
    tags={{ html: component }}
    onIterate={handleIterate}
    markdownOptions={{ typographer: true }}
    {...props}
  />
)

Markdown.propTypes = {
  component: PropTypes.string,
  text: PropTypes.string.isRequired
}

export default Markdown
