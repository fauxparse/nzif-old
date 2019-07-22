import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import PageHeader from './shared/page_header'
import Markdown from './shared/markdown'
import Loader from 'atoms/loader'
import Skeleton from './shared/skeleton_text'
import Breadcrumbs from './shared/breadcrumbs'
import NotFound from './not_found'

const CONTENT_QUERY = gql`
  query getContent($slug: String!) {
    content(slug: $slug) {
      title
      slug
      raw
      updatedAt
    }
  }
`

const StaticContent = ({ match }) => {
  const { slug, year } = match.params

  const { loading, data: { content } = {}, error } = useQuery(
    CONTENT_QUERY,
    { variables: { slug: match.params.slug } }
  )

  if (!loading && error) {
    return <NotFound />
  }

  return (
    <section className="static-content__page">
      <PageHeader
        className="static-content__header"
        title={loading ? slug : content.title}
        loading={loading}
        back={`/${year}`}
        breadcrumbs={(
          <Breadcrumbs.Link to={`/${year}`}>
            NZIF {year}
          </Breadcrumbs.Link>
        )}
      >
        <Skeleton loading={loading} as="h1" className="page-header__title">
          {loading ? slug : content.title}
        </Skeleton>
      </PageHeader>
      <div className="static-content__container">
        {loading ? (
          <Loader />
        ) : (
          <Markdown className="static-content" text={content.raw} data-slug={slug} />
        )}
      </div>
    </section>
  )
}

StaticContent.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default StaticContent
