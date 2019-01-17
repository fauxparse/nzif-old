/* eslint-disable react/display-name */

import React from 'react'
import styled from 'styled-components'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { fullWidth } from '../../styles'
import { IconField, Input } from '../../components/form'
import { icon } from '../knobs'

const Container = styled.section`
  ${fullWidth}
`

export default () => (
  <Container>
    <IconField icon={icon('Icon', 'link')} label="Field label" loading={boolean('Loading', false)}>
      <Input />
    </IconField>
  </Container>
)
