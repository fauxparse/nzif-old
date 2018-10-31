import React, { Fragment } from 'react'
import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import Theme, { GlobalStyle } from '../app/javascript/themes'

const req = require.context('../app/javascript/stories', true, /(\.stories|index)\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(story => (
  <ThemeProvider theme={Theme}>
    <Fragment>
      <GlobalStyle />
      {story()}
    </Fragment>
  </ThemeProvider>
))

configure(loadStories, module)
