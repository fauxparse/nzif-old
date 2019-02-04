/* global module */

import { storiesOf } from '@storybook/react'
import loader from './loader'
import ripple from './ripple'
import skeletonText from './skeleton_text'

storiesOf('Effects', module)
  .add('Loader', loader)
  .add('Ripple', ripple)
  .add('Skeleton text', skeletonText)
