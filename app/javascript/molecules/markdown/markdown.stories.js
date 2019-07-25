/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'
import Markdown from './'

storiesOf('Molecules|Markdown', module)
  .add('Basic', () => (
    <Markdown
      text={text('Text', 'text')}
      options={{ breaks: boolean('Breaks', false) }}
    />
  ))
