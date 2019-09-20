/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import TextLink from './'

storiesOf('Atoms|TextLink', module)
  .add('Basic', () => (
    <TextLink to={text('URL', '/')}>{text('Link text', 'Text link')}</TextLink>
  ))
