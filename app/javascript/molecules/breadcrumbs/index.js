import React, { Fragment } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Button from 'atoms/button'
import BreadcrumbsLink from './link'

import './index.scss'

const Breadcrumbs = ({ back, className, children, ...props }) => (
  <div className={classNames('breadcrumbs', className)} {...props}>
    {back && (
      <Button className="breadcrumbs__back" as={Link} to={back} icon="arrow-left" />
    )}
    {React.Children.map(children, (child, i) => (
      <Fragment>
        {i > 0 && <span className="breadcrumbs__divider" />}
        {child}
      </Fragment>
    ))}
  </div>
)

Breadcrumbs.Link = BreadcrumbsLink

Breadcrumbs.propTypes = {
  back: PropTypes.location,
}

Breadcrumbs.defaultProps = {
  back: undefined,
}

export default Breadcrumbs
