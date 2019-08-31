import React, { useRef } from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import Header from 'organisms/header'
import Markdown from 'molecules/markdown'
import Skeleton from 'effects/skeleton'
import Breadcrumbs from 'molecules/breadcrumbs'
import { lorem } from 'faker'
import humanize from 'lib/humanize'
import { usePermission } from 'lib/permissions'

const StaticContent = ({ loading, slug, raw, title, year }) => {
  const loadingText = useRef(lorem.paragraphs(5))

  const canEdit = usePermission('editContent')

  return (
    <section className="static-content__page">
      <Header colored>
        <Breadcrumbs back={`/${year}`}>
          <Breadcrumbs.Link to={`/${year}`}>NZIF {year}</Breadcrumbs.Link>
        </Breadcrumbs>
        <Skeleton as={Header.Title} loading={loading}>
          {loading ? humanize(slug) : title}
        </Skeleton>
        {canEdit && <Header.Button as={Link} to={`/admin/${year}/content/${slug}`} icon="edit" />}
      </Header>
      <div className="static-content__container">
        <Skeleton
          as={Markdown}
          loading={loading}
          className="static-content"
          text={loading ? loadingText.current : raw}
          data-slug={slug}
        />
      </div>
    </section>
  )
}

StaticContent.propTypes = {
  loading: PropTypes.bool,
  slug: PropTypes.id.isRequired,
  title: PropTypes.string,
  raw: PropTypes.string,
  year: PropTypes.id.isRequired,
}

StaticContent.defaultProps = {
  loading: false,
  title: undefined,
  raw: undefined,
}

export default StaticContent
