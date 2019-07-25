/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { array } from '@storybook/addon-knobs'
import Sentence from './'

storiesOf('Atoms|Sentence', module)
  .add('Basic', () => <Sentence>{array('Items', ['the giraffe', 'the pelly', 'me'])}</Sentence>)
