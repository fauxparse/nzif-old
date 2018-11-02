/* eslint-disable react/display-name */

import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { boolean } from '@storybook/addon-knobs'
import { color } from '../knobs'
import SkeletonText from '../../components/shared/skeleton_text'

const SkeletonTextExample = styled.section`
  margin: 0 auto;
  padding: 1em;
  max-width: 20em;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`

export default () => {
  const loading = boolean('Loading', false)
  const background = color('Background')
  const theme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      background: background || 'none',
      text: background ? 'white' : theme.colors.text,
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <SkeletonTextExample background={color('Background')}>
        <h2><SkeletonText loading={loading}>Chapter 1</SkeletonText></h2>
        <p>
          <SkeletonText loading={loading}>
            You think darkness is your ally? You merely adopted the dark, I was born in it.
            Moulded by it. I didn’t see the light until I was already a man.
            By then there was nothing to be but blinded.
          </SkeletonText>
        </p>
      </SkeletonTextExample>
    </ThemeProvider>
  )
}
