import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import classNames from 'classnames'
import Icon from '../icons'
import { Link } from './ripple'
import TextLink from './text_link'

const Breadcrumbs = forwardRef(({ className, back, children, ...props }, ref) => (
  <div ref={ref} className={classNames('breadcrumbs', className)} {...props}>
    {back && <Link to={back} className="breadcrumbs__back"><Icon name="back" /></Link>}
    {children}
  </div>
))

Breadcrumbs.displayName = 'Breadcrumbs'

Breadcrumbs.propTypes = {
  back: PropTypes.oneOfType([
    ReactRouterPropTypes.location,
    PropTypes.string,
  ]),
}

Breadcrumbs.defaultProps = {
  back: null,
}

export const BreadcrumbsLink = ({ className, children, ...props }) => (
  <TextLink className={classNames('breadcrumbs__link', className)} {...props}>
    {children}
  </TextLink>
)

Breadcrumbs.Link = BreadcrumbsLink

export default Breadcrumbs
