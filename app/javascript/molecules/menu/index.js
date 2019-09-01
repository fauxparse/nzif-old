import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Reference, Popper } from 'react-popper'
import Proptypes from 'lib/proptypes'
import { useUUID } from 'lib/hooks'
import MenuItem from './item'
import MenuLink from './link'
import MenuButton from './button'
import MenuContent from './content'
import Portal from './portal'
import './index.scss'

const Menu = ({
  button: Button,
  content: Content,
  className,
  children,
  ...props
}) => {
  const container = useRef()

  const update = useRef()

  const themeParent = useRef()

  const [open, setOpen] = useState(false)

  const id = useUUID()

  const toggle = useCallback(() => setOpen(!open), [open, setOpen])

  const close = useCallback(() => setOpen(false), [setOpen])

  useEffect(() => {
    themeParent.current = container.current.closest('[data-theme]')
  }, [])

  useEffect(() => {
    if (open && update.current) update.current()
  }, [open, update])

  return (
    <div ref={container} className={classNames('menu', open && 'menu--open', className)}>
      <Reference>
        {({ ref }) => (
          <Button
            ref={ref}
            className={classNames(className && `${className}__button`)}
            id={`menu-button-${id}`}
            aria-haspopup="menu"
            aria-controls={`menu-${id}`}
            aria-expanded={open || undefined}
            onClick={toggle}
            {...props}
          />
        )}
      </Reference>
      <Popper placement="bottom-end" positionFixed>
        {({ ref, style, placement, scheduleUpdate }) => {
          update.current = scheduleUpdate
          return (
            <Portal open={open}>
              <Content
                ref={ref}
                className={classNames(className && `${className}__content`)}
                open={open}
                onClose={close}
                id={`menu-${id}`}
                style={style}
                aria-labelledby={`menu-button-${id}`}
                data-placement={placement}
                data-theme={themeParent.current && themeParent.current.dataset.theme}
                onClick={close}
              >
                {children}
              </Content>
            </Portal>
          )
        }}
      </Popper>
    </div>
  )
}

Menu.propTypes = {
  button: Proptypes.component,
  content: Proptypes.component,
  className: Proptypes.className,
}

Menu.defaultProps = {
  button: MenuButton,
  content: MenuContent,
}

Menu.Button = MenuButton
Menu.Content = MenuContent
Menu.Item = MenuItem
Menu.Link = MenuLink

export default Menu
