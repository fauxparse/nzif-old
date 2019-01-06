/* global module */

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import loader from './loader'
import ripple from './ripple'
import skeletonText from './skeleton_text'

storiesOf('Effects', module)
  .addDecorator(withKnobs)
  .add('Loader', loader)
  .add('Ripple', ripple)
  .add('Skeleton text', skeletonText)
