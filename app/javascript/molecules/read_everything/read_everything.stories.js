/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { lorem } from 'faker'
import Markdown from 'molecules/markdown'
import ReadEverything from './'

storiesOf('Molecules|ReadEverything', module)
  .add('Scrolling text', () => (
    <ReadEverything onRead={action('Read')}>
      <Markdown text={lorem.paragraphs(10)} />
    </ReadEverything>
  ))
