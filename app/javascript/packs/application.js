/* global require */

import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import Application from 'components/application'

require('@rails/ujs').start()

document.addEventListener('DOMContentLoaded', () => {
  const root = document.body.appendChild(document.createElement('div'))
  root.id = 'root'

  ReactDOM.render(
    <Application />,
    root
  )

  Modal.setAppElement('#root')
})
