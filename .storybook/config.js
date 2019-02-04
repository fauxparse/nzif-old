import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'

import '../app/javascript/styles/application.scss'

const req = require.context('../app/javascript/stories', true, /(\.stories|index)\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(withKnobs)

addDecorator(story => (
  <div data-theme={select('Theme', { light: 'light', dark: 'dark' }, 'light')}>
    <div className="container" style={{ width: '100vw', height: '100vh' }}>
      {story()}
    </div>
  </div>
))

configure(loadStories, module)
