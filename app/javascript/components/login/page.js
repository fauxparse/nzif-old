import React from 'react'
import classNames from 'classnames'
import Button from '../button'

const Page = ({ className, onClose, children, ...props }) => (
  <section className={classNames('login', className)} {...props}>
    <svg className="login__background" width="100%" height="100%" viewBox="-100 0 100 100" preserveAspectRatio="xMaxYMin slice">
      <circle cx={0} cy={0} r={150} />
    </svg>
    {children}
    <Button className="login__close" icon="close" onClick={onClose} />
  </section>
)

export default Page
