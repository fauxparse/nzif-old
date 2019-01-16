import React from 'react'
import styled, { css } from 'styled-components'
import AutosizeInput from 'react-input-autosize'
import { IconField } from '../../form'

const SlugRoot = styled.span`${({ theme }) => css`
  flex: 0 1 auto;
  color: ${theme.colors.secondary};
  padding: 0.25rem 0;
  direction: rtl;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::before { content: '/'; }
`}`

const SlugInput = styled(AutosizeInput)`${({ theme }) => css`
  input {
    appearance: none;
    background: transparent;
    border: 0;
    border-bottom: 1px solid ${theme.colors.border};
    box-shadow: none;
    color: inherit;
    display: block;
    font: inherit;
    line-height: ${theme.fonts.lineHeight};
    margin: 0;
    padding: 0.25rem 0 calc(0.25rem - 1px);
    width: 100%;
    max-width: 100%;
    min-width: 4em;

    &:focus {
      outline: none;
      border-bottom-color: ${theme.colors.accent};
    }

    &:disabled {
      opacity: 0.5;
    }
  }
`}`

const SlugContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.5rem;
  min-height: 2.5rem;
  max-width: 100%;
  overflow: hidden;
`

const Slug = ({ root, value, onChange, ...props }) => (
  <IconField icon="link" label="URL">
    <SlugContainer>
      <SlugRoot>{root}</SlugRoot>
      <SlugInput value={value} onChange={onChange} {...props} />
    </SlugContainer>
  </IconField>
)

export default Slug
