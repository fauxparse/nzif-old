import React from 'react'

const Subcomponent = ({ type, as: Component, renderDefault, children, ...extra }) => {
  const matching = React.Children.toArray(children).filter(child => child.type === type)

  if (!matching.length) {
    return renderDefault ? <Component {...extra} /> : null
  }

  return matching.map(({ key, props: { children, ...props } }) => (
    <Component key={key} {...extra} {...props}>
      {children}
    </Component>
  ))
}

export default Subcomponent
