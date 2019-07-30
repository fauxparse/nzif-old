/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Breadcrumbs from './'

storiesOf('Molecules|Breadcrumbs', module)
  .add('Basic', () => (
    <Breadcrumbs>
      <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
    </Breadcrumbs>
  ))
  .add('With back button', () => (
    <Breadcrumbs back="/">
      <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
      <Breadcrumbs.Link to="/">Stuff</Breadcrumbs.Link>
    </Breadcrumbs>
  ))
