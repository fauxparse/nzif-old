import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Picture } from 'react-responsive-picture'
import Skeleton from 'effects/skeleton'

const Image = ({ className, loading, image, alt, ...props }) => {
  const visible = !loading && !!image

  return (
    <TransitionGroup
      component={Skeleton}
      appear
      as="div"
      className={classNames('card__image', className)}
      loading={loading}
    >
      {visible && (
        <CSSTransition key={image.thumbnail} classNames="card__image-" timeout={300}>
          <Picture
            alt={alt}
            sources={[
              { srcSet: `${image.thumbnail}, ${image.small} 2x`, media: '(max-width: 384px)' },
              { srcSet: `${image.small}, ${image.medium} 2x` },
            ]}
            {...props}
          />
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}

Image.propTypes = {
  loading: PropTypes.bool,
  image: PropTypes.image,
  alt: PropTypes.string.isRequired,
}

Image.defaultProps = {
  loading: false,
  image: null,
}

export default Image
