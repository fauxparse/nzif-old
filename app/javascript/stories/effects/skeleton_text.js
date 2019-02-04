/* eslint-disable react/display-name */

import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { color } from '../knobs'
import SkeletonText from '../../components/shared/skeleton_text'

export default () => {
  const loading = boolean('Loading', false)
  const background = color('Background')

  return (
    <section style={{
      margin: '0 auto',
      padding: '1em',
      maxWidth: '20em',
      background,
    }}>
      <h2><SkeletonText loading={loading}>Chapter 1</SkeletonText></h2>
      <p>
        <SkeletonText loading={loading}>
          You think darkness is your ally? You merely adopted the dark, I was born in it.
          Moulded by it. I didn’t see the light until I was already a man.
          By then there was nothing to be but blinded.
        </SkeletonText>
      </p>
    </section>
  )
}
