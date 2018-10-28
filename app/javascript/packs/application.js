import React from 'react'
import ReactDOM from 'react-dom'
import Application from 'components/application'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application />,
    document.body.appendChild(document.createElement('div')),
  )
})
