import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { Manager } from 'react-popper'
import { configure, addDecorator } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { StaticContentProvider, DummyLoader } from 'contexts/static_content'
import Modal from 'react-modal'

import '../app/javascript/styles/application.scss'

addDecorator(withKnobs)

addDecorator((story, { parameters: { options = {} } }) => {
  const theme = select('Theme', { light: 'light', dark: 'dark' }, options.theme || 'light')
  const padding = options.padding === false ? 0 : (options.padding || '1rem')

  return (
    <div key={theme} data-theme={theme}>
      <div className="container" style={{ width: '100vw', minHeight: '100vh', padding }}>
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

addDecorator(story => (
  <StaticContentProvider loader={DummyLoader}>
    {story()}
  </StaticContentProvider>
))

addDecorator(story => {
  Modal.setAppElement('#root')
  return story()
})

const req = require.context('../app/javascript', true, /\.stories\.js$/)
configure(() => req.keys().forEach(filename => req(filename)), module)
