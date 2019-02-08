import React from 'react'
import classNames from 'classnames'

const PageContent = ({ className, children, ...props }) => (
  <section className={classNames('page-content', className)} {...props}>
    {children}
  </section>
)

export default PageContent
