import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import MDReactComponent from 'markdown-react-js'
import TextLink from 'atoms/text_link'

const handleIterate = (Tag, tagProps, children, _level) => {
  if (Tag === 'a') {
    const { href, rel, target, ...rest } = tagProps
    return (
      <TextLink to={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </TextLink>
    )
  }

  if (children === undefined) {
    return <Tag {...tagProps} />
  } else {
    return <Tag {...tagProps}>{children}</Tag>
  }
}

const Markdown = ({ className, component = 'div', text, options, ...props }) => (
  <MDReactComponent
    key={options}
    className={classNames('markdown', className)}
    text={text || ''}
    tags={{ html: component }}
    onIterate={handleIterate}
    markdownOptions={{ typographer: true, ...options }}
    {...props}
  />
)

Markdown.propTypes = {
  component: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.className,
  options: PropTypes.shape({
    html: PropTypes.bool,
    xhtmlOut: PropTypes.bool,
    breaks: PropTypes.bool,
    langPrefix: PropTypes.string,
    linkify: PropTypes.bool,
    typographer: PropTypes.bool,
    quotes: PropTypes.string,
    highlight: PropTypes.func,
  }),
}

Markdown.defaultProps = {
  className: null,
  text: '',
  options: {},
}

export default Markdown
