import React from 'react'
import classNames from 'classnames'

const PageContent = ({ className, children, ...props }) => (
  <div className={classNames('page-content', className)} {...props}>
    {children}
  </div>
)

export default PageContent
