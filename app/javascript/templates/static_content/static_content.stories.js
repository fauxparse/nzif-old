/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import StaticContent from './'
import { lorem } from 'faker'

const DUMMY_TEXT = lorem.paragraphs(10)

storiesOf('Templates|Static Content', module)
  .add('Code of conduct', () => (
    <StaticContent
      loading={boolean('Loading', false)}
      slug="code-of-conduct"
      title="Code of Conduct"
      raw={DUMMY_TEXT}
      year={2019}
    />
  ))
