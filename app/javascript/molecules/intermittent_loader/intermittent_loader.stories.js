/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import IntermittentLoader from './'

storiesOf('Molecules|IntermittentLoader', module)
.add('With transitions', () => <IntermittentLoader loading={boolean('Loading', false)} />)
