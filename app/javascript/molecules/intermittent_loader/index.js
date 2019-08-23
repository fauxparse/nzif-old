import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Loader from 'atoms/loader'

import './index.scss'

const IntermittentLoader = ({ className, loading, ...props }) => (
  <TransitionGroup>
    {loading && (
      <CSSTransition classNames="intermittent-loader-" timeout={300}>
        <Loader
          className={classNames('intermittent-loader', className)}
          {...props}
        />
      </CSSTransition>
    )}
  </TransitionGroup>
)

IntermittentLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
}

export default IntermittentLoader
