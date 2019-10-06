import React from 'react'
import { storiesOf } from '@storybook/react'
import Radio from './'

storiesOf('Atoms|Radio', module)
  .add('Group with labels', () => (
    <div>
      <Radio name="name" value="tomato">Tomato</Radio>
      <Radio name="name" value="grape">Grape</Radio>
      <Radio name="name" value="apple">Apple</Radio>
    </div>
  ))
