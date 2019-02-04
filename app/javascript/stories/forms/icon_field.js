/* eslint-disable react/display-name */

import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { IconField, Input } from '../../components/form'
import { icon } from '../knobs'

export default () => (
  <section style={{ marginLeft: '4.5rem' }}>
    <IconField icon={icon('Icon', 'link')} label="Field label" loading={boolean('Loading', false)}>
      <Input />
    </IconField>
  </section>
)
