/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Hint from './'

storiesOf('Atoms|Hint', module).add('Basic', () => <Hint>This is a hint.</Hint>)
