import React, { useMemo } from 'react'
import classNames from 'classnames'
import partition from 'lib/partition'
import isEmpty from 'lodash/isEmpty'
import { useSticky } from 'lib/hooks'
import Button from 'atoms/button'
import Breadcrumbs from 'molecules/breadcrumbs'
import TabBar from 'molecules/tab_bar'

import './index.scss'

const Background = ({ className, children, ...props }) => (
  <div className={classNames('header__background', className)} {...props}>
    {children}
  </div>
)

const Header = ({ className, children, ...props }) => {
  const top = useSticky()

  const [breadcrumbs, background, buttons, tabs, rest] = useMemo(() => partition(
    React.Children.toArray(children),
    child => child.type === Breadcrumbs,
    child => child.type === Background,
    child => child.type === Button,
    child => child.type === TabBar,
  ), [children])

  return (
    <header
      className={classNames(
        'header',
        !isEmpty(background) && 'header--has-background',
        !isEmpty(tabs) && 'header--has-tabs',
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
      {tabs}
      {background}
    </header>
  )
}

Header.Background = Background
Header.Button = Button

export default Header
