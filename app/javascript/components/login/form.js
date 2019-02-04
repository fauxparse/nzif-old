import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Tag as FormTag,
  Fieldset,
  Error,
} from '../form'

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
      <FormTag className={classNames('login__form', className)} onSubmit={onSubmit} method="post">
        <Fieldset className="login__fieldset" disabled={loading} aria-busy={loading}>
          <h2 className="login__title">{title}</h2>
          {this.message()}
          {children}
        </Fieldset>
      </FormTag>
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
