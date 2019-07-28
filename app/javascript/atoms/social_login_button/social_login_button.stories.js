/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { radios } from '@storybook/addon-knobs'
import SocialLoginButton, { PLATFORMS } from './'

storiesOf('Atoms|SocialLoginButton', module)
  .add('Basic', () => (
    <SocialLoginButton
      platform={radios('Platform', PLATFORMS, PLATFORMS[0])}
    />
  ))
