import React from 'react'

const Footer = React.forwardRef(({ children }, ref) => (
  <footer className="footer" ref={ref}>
    {children}
  </footer>
))

export default Footer
