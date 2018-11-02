/* global module */

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ripple from './ripple'
import skeletonText from './skeleton_text'

storiesOf('Effects', module)
  .addDecorator(withKnobs)
  .add('Ripple', ripple)
  .add('Skeleton text', skeletonText)
