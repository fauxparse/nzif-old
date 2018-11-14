// A copy/paste of the standard NavLink that cares about refs

import React from 'react'
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

Link.propTypes.innerRef = PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object])

const NavLink = React.forwardRef(({
  'aria-current': ariaCurrent = 'page',
  activeClassName = 'active',
  activeStyle,
  className: classNameProp,
  exact,
  isActive: isActiveProp,
  location,
  strict,
  style: styleProp,
  to,
  ...rest
}, ref) => {
  const path = typeof to === 'object' ? to.pathname : to

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')

  return (
    <Route
      path={escapedPath}
      exact={exact}
      strict={strict}
      location={location}
    >
      {({ location, match }) => {
        const isActive = !!(isActiveProp ? isActiveProp(match, location) : match)
        const className = isActive ? classNames(classNameProp, activeClassName) : classNameProp
        const style = isActive ? { ...styleProp, ...activeStyle } : styleProp

        return (
          <Link
            aria-current={(isActive && ariaCurrent) || null}
            className={className}
            style={style}
            to={to}
            innerRef={ref}
            {...rest}
          />
        )
      }}
    </Route>
  )
})

const ariaCurrentType = PropTypes.oneOf([
  'page',
  'step',
  'location',
  'date',
  'time',
  'true',
])

NavLink.propTypes = {
  'aria-current': ariaCurrentType,
  activeClassName: PropTypes.string,
  activeStyle: PropTypes.object,
  className: PropTypes.string,
  exact: Route.propTypes.exact,
  isActive: PropTypes.func,
  location: PropTypes.object,
  strict: Route.propTypes.strict,
  style: PropTypes.object,
  to: Link.propTypes.to,
}

export default NavLink
