import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { Manager } from 'react-popper'
import { configure, addDecorator } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'

import '../app/javascript/styles/application.scss'

addDecorator(withKnobs)

addDecorator(story => {
  const theme = select('Theme', { light: 'light', dark: 'dark' }, 'light')
  return (
    <div key={theme} data-theme={theme}>
      <div className="container" style={{ width: '100vw', height: '100vh' }}>
        {story()}
      </div>
    </div>
  )
})

addDecorator(story => (
  <MemoryRouter>
    {story()}
  </MemoryRouter>
))

addDecorator(story => (
  <Manager>
    {story()}
  </Manager>
))

const req = require.context('../app/javascript', true, /\.stories\.js$/)
configure(() => req.keys().forEach(filename => req(filename)), module)
