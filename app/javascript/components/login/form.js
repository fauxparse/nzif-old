import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BrandedText from '../../styles/branded_text'
import Button from '../button'
import {
  Tag as FormTag,
  Field as FormField,
  Fieldset as FormFieldset,
  Error,
} from '../form'

export const Title = styled(BrandedText)`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fonts.scale(6)};
  line-height: ${({ theme }) => theme.fonts.scale(1)};
  margin: 0 0 0.25em;
`

export const Field = styled(FormField)`
  font-size: ${({ theme }) => theme.fonts.scale(1)};
`

export const Fieldset = styled(FormFieldset)`
  > p {
    margin: 0 0 2em;
  }
`

export const Container = styled(FormTag)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const SubmitButton = styled(Button)`
  margin: 2em 0;
`

class Form extends React.Component {
  message() {
    const { errors, loading, message } = this.props

    if (loading) {
      return <p>Hold on…</p>
    } else if (errors.length) {
      return <Error>{errors[0].message}</Error>
    } else {
      return <p>{message}</p>
    }
  }

  render() {
    const { className, loading, title, onSubmit, children } = this.props

    return (
      <Container className={className} onSubmit={onSubmit} method="post">
        <Fieldset disabled={loading} aria-busy={loading}>
          <Title as="h2">{title}</Title>
          {this.message()}
          {children}
        </Fieldset>
      </Container>
    )
  }
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({ message: PropTypes.string }).isRequired).isRequired,
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

Form.defaultProps = {
  className: null,
}

export default Form
