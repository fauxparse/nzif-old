/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import List from 'molecules/list'
import Divider from 'atoms/divider'
import Sidebar from './'

storiesOf('Organisms|Sidebar', module)
  .add('Public', () => (
    <Sidebar open={boolean('Open', true)}>
      <List>
        <List.Link to="#" icon="home" primary="Festival home" />
        <List.Link to="#" icon="workshop" primary="Workshops" />
        <List.Link to="#" icon="show" primary="Shows" />
        <List.Link to="#" icon="pitch" primary="My pitches" />
      </List>
      <Divider inset />
      <List compact>
        <List.Link to="#" icon="venue" primary="Venue map" />
        <List.Link to="#" icon="code-of-conduct" primary="Code of conduct" />
        <List.Link
          as="a"
          href="https://improvfest.nz"
          target="_blank"
          rel="noopener noreferrer"
          icon="external-link"
          primary="Public website"
        />
      </List>
    </Sidebar>
  ))
