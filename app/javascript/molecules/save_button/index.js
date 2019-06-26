import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Button from 'atoms/button'
import Loader from 'atoms/loader'

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
  className: PropTypes.className,
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
