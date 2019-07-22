import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const MenuPortal = ({ children }) => {
  const portal = useRef()

  useEffect(() => {
    portal.current = document.createElement('div')
    portal.current.classList.add('menu__portal')
    document.querySelector('body').appendChild(portal.current)
    return () => portal.current.parentNode.removeChild(portal.current)
  }, [])

  return portal.current ? createPortal(children, portal.current) : null
}

export default MenuPortal
