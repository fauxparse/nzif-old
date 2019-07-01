/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import Logo from './'

storiesOf('Atoms|Logo', module)
  .add('Basic', () => <Logo year={number('Year', new Date().getYear() + 1900)} />)
