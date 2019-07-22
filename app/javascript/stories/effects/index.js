/* global module */

import { storiesOf } from '@storybook/react'
import ripple from './ripple'
import skeletonText from './skeleton_text'

storiesOf('Effects', module)
  .add('Ripple', ripple)
  .add('Skeleton text', skeletonText)
