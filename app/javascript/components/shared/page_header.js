import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import classNames from 'classnames'
import stickybits from 'stickybits'
import { Picture } from 'react-responsive-picture'
import Breadcrumbs from './breadcrumbs'
import Duotone from '../shared/duotone'

const PageHeader = ({
  loading,
  title,
  back,
  breadcrumbs,
  background,
  controls,
  className,
  children,
  ...props
}) => {
  const sticky = useRef()
  const stickySection = useRef()

  useEffect(() => {
    sticky.current && sticky.current.cleanup()
    sticky.current = stickybits(stickySection.current, {
      useFixed: true,
      useGetBoundingClientRect: true,
    })
    return () => sticky.current.cleanup()
  }, [loading, breadcrumbs])

  const pictureSources = useMemo(() => background && [
    {
      srcSet: `${background.thumbnail}, ${background.small} 2x`,
      media: '(max-width: 384px)'
    },
    {
      srcSet: `${background.medium}, ${background.full} 2x`,
      media: '(max-width: 960px)'
    },
    {
      srcSet: background.full
    }
  ], [background])

  return (
    <header className={classNames('page-header', className)} data-theme="dark" {...props}>
      {background && (
        <Duotone>
          <Picture
            className="page-header__background"
            alt={title}
            sources={pictureSources}
          />
        </Duotone>
      )}
      <div className="page-header__top">
        <div
          ref={stickySection}
          className="page-header__sticky"
        >
          <Breadcrumbs className="page-header--breadcrumbs" back={back}>
            {breadcrumbs}
          </Breadcrumbs>
          <div className="page-header__controls">
            {controls}
          </div>
        </div>
      </div>
      <div className="activity-header__contents">
        {children}
      </div>
    </header>
  )
}

PageHeader.propTypes = {
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  back: PropTypes.oneOfType([
    ReactRouterPropTypes.location,
    PropTypes.string,
  ]),
  breadcrumbs: PropTypes.element,
  controls: PropTypes.element,
  background: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    small: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    full: PropTypes.string.isRequired,
  }),
}

PageHeader.defaultProps = {
  breadcrumbs: null,
  controls: null,
  background: null,
}

export default PageHeader
