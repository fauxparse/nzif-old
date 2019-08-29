import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import partition from 'lib/partition'
import isEmpty from 'lodash/isEmpty'
import { useSticky } from 'lib/hooks'
import Button from 'atoms/button'
import Breadcrumbs from 'molecules/breadcrumbs'
import Search from 'molecules/search'
import TabBar from 'molecules/tab_bar'

import './index.scss'

const Title = ({ className, children, ...props }) => (
  <h1 className={classNames('header__title', className)} {...props}>
    {children}
  </h1>
)

const Background = ({ className, children, ...props }) => (
  <div className={classNames('header__background', className)} {...props}>
    {children}
  </div>
)

const Header = ({ className, colored, children, ...props }) => {
  const top = useSticky()

  const [breadcrumbs, background, buttons, search, tabs, rest] = useMemo(() => partition(
    React.Children.toArray(children),
    child => child.type === Breadcrumbs,
    child => child.type === Background,
    child => child.type === Button,
    child => child.type === Search,
    child => child.type === TabBar,
  ), [children])

  return (
    <header
      className={classNames(
        'header',
        !isEmpty(background) && 'header--has-background',
        !isEmpty(tabs) && 'header--has-tabs',
        colored && 'header--colored',
        className
      )}
      {...props}
    >
      <div className="header__top-wrapper">
        <div ref={top} className="header__top">
          {breadcrumbs}
          {!isEmpty(buttons) && (
            <div className="header__buttons">
              {buttons}
            </div>
          )}
        </div>
      </div>
      <div className="header__bottom">
        {rest}
      </div>
      {search}
      {tabs}
      {background}
    </header>
  )
}

Header.propTypes = {
  colored: PropTypes.bool,
}

Header.defaultProps = {
  colored: false,
}

Header.Title = Title
Header.Background = Background
Header.Button = Button

export default Header
