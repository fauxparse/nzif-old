/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import TextLink from './'

storiesOf('Atoms|TextLink', module)
  .add('Basic', () => <TextLink to="/">Text link</TextLink>)
