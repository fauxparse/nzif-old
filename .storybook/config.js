import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'

import '../app/javascript/styles/application.scss'

addDecorator(withKnobs)

addDecorator(story => (
  <div data-theme={select('Theme', { light: 'light', dark: 'dark' }, 'light')}>
    <div className="container" style={{ width: '100vw', height: '100vh' }}>
      {story()}
    </div>
  </div>
))

const req = require.context('../app/javascript', true, /\.stories\.js$/)
configure(() => req.keys().forEach(filename => req(filename)), module)
