// A copy/paste of the standard NavLink that cares about refs

import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

Link.propTypes.innerRef = PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object])

class LinkWithCallbacks extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    onActivate: PropTypes.func,
    onDeactivate: PropTypes.func,
  }

  componentDidUpdate(prevProps) {
    const { isActive, onActivate, onDeactivate } = this.props

    if (isActive && !prevProps.isActive && onActivate) {
      onActivate()
    }

    if (!isActive && prevProps.isActive && onDeactivate) {
      onDeactivate()
    }
  }

  render() {
    const { isActive, onActivate, onDeactivate, ...props } = this.props
    return <Link {...props} />
  }
}

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

  const aria = {}
  if (rest.role === 'tab') {
    aria['aria-selected'] = isActiveProp || undefined
  } else if (isActiveProp) {
    aria['aria-current'] = ariaCurrent
  }

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
          <LinkWithCallbacks
            isActive={isActive}
            {...aria}
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
  onActivate: PropTypes.func,
  onDeactivate: PropTypes.func,
}

export default NavLink
