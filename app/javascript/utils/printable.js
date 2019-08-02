import React, { useEffect } from 'react'
import PropTypes from 'lib/proptypes'
import Loader from 'atoms/loader'
import Button from 'atoms/button'

const Printable = ({ goBack, loading, children }) => {
  useEffect(() => {
    if (!loading) {
      window.print()
    }
  }, [loading])

  return (
    <div className="printable" data-theme="light">
      {loading ? (
        <Loader />
      ) : (
        <div className="printable__ready">
          <p>Ready to print…</p>
          <Button
            onClick={goBack}
            icon="arrow-left"
            text="Back"
          />
        </div>
      )}
      <div className="printable__content">{children}</div>
    </div>
  )
}

Printable.propTypes = {
  goBack: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default Printable
