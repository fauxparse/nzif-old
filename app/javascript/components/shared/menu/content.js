import React, { forwardRef } from 'react'
import classNames from 'classnames'

const Content = forwardRef(({ className, children, ...props }, ref) => (
  <nav ref={ref} className={classNames('menu__content', className)} {...props}>
    {children}
  </nav>
))

Content.displayName = 'Menu.Content'

export default Content
