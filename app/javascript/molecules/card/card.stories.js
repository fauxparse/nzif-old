/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import Level from 'atoms/level'
import Card from './'

const SIZES = {
  thumbnail: 384,
  small: 768,
  medium: 960,
}

const BASE = 'https://images.unsplash.com/photo-1516708274537-6f91e34ccaf2'

const IMAGE = Object.keys(SIZES).reduce((h, s) => ({
  ...h,
  [s]: `${BASE}?w=${SIZES[s]}`,
}), {})

storiesOf('Molecules|Card', module)
  .add('Activity', () => (
    <Card className="activity-card" loading={boolean('Loading', false)}>
      <Card.Image image={IMAGE} alt="Preview image" />
      <Card.Category>Workshop</Card.Category>
      <Card.Title>110% You: Finding your inner MC</Card.Title>
      <Card.Description>
        <p>Matt Powell <small>(Wellington)</small></p>
      </Card.Description>
      <Card.Tags>
        <Level small level="intermediate" />
        <Level small level="advanced" />
      </Card.Tags>
    </Card>
  ))
