import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CommonProps from '../../lib/common_props'
import Button from '../button'
import Loader from './loader'

const SaveButton = ({ className, saving, text, disabled, savingText, ...props }) => (
  <Button
    className={classNames('button--save', className)}
    disabled={disabled || saving || undefined}
    {...props}
  >
    {saving && <Loader className="button__loader" />}
    <Button.Text>{saving ? savingText : text}</Button.Text>
  </Button>
)

SaveButton.propTypes = {
  className: CommonProps.className,
  saving: PropTypes.bool,
  text: PropTypes.string,
  savingText: PropTypes.string,
  disabled: PropTypes.bool,
}

SaveButton.defaultProps = {
  className: null,
  saving: false,
  text: 'Save changes',
  savingText: 'Saving…',
  disabled: false,
}

export default SaveButton
