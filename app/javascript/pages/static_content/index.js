import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useStaticContent } from 'contexts/static_content'
import NotFound from 'templates/not_found'
import Template from 'templates/static_content'

const StaticContent = ({ match }) => {
  const { slug, year } = match.params

  const { loading, raw, title, error } = useStaticContent(slug)

  if (!loading && error) {
    return <NotFound />
  }

  return (
    <Template
      loading={loading}
      slug={slug}
      year={year}
      title={title}
      raw={raw}
    />
  )
}

StaticContent.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default StaticContent
