import React, { Children, cloneElement } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Image from './image'
import Category from './category'
import Title from './title'
import Description from './description'
import Tags from './tags'

import './index.scss'

const Card = ({
  as: Component,
  className,
  loading,
  children,
  ...props
}) => (
  <Component
    className={classNames('card', loading && 'card--loading', className)}
    {...props}
  >
    {Children.map(children, child => cloneElement(child, { loading }))}
  </Component>
)

Card.propTypes = {
  as: PropTypes.component,
  loading: PropTypes.bool,
}

Card.defaultProps = {
  as: 'article',
  loading: false,
}

Card.Image = Image
Card.Category = Category
Card.Title = Title
Card.Description = Description
Card.Tags = Tags

export default Card
