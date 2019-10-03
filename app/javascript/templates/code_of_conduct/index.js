import React, { useRef } from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import Header from 'organisms/header'
import Markdown from 'molecules/markdown'
import Skeleton from 'effects/skeleton'
import { lorem } from 'faker'
import { usePermission } from 'lib/permissions'
import Date from 'atoms/date'
import Breadcrumbs from 'molecules/breadcrumbs'

import './index.scss'

const CodeOfConduct = ({ loading, raw, title, year, acceptedAt }) => {
  const loadingText = useRef(lorem.paragraphs(5))

  const canEdit = usePermission('editContent')

  return (
    <section className="static-content__page code-of-conduct">
      <Header colored>
        <Breadcrumbs back={`/${year}`}>
          <Breadcrumbs.Link to={`/${year}`}>NZIF {year}</Breadcrumbs.Link>
        </Breadcrumbs>
        <Skeleton as={Header.Title} loading={loading}>
          {loading ? 'Code of conduct' : title}
        </Skeleton>
        {canEdit && (
          <Header.Button as={Link} to={`/admin/${year}/content/code-of-conduct`} icon="edit" />
        )}
      </Header>
      {acceptedAt && (
        <div className="code-of-conduct__accepted">
          <p>You accepted the Code of conduct on <Date date={acceptedAt} /></p>
        </div>
      )}
      <div className="static-content__container">
        <Skeleton
          as={Markdown}
          loading={loading}
          className="static-content"
          text={loading ? loadingText.current : raw}
        />
      </div>
    </section>
  )
}

CodeOfConduct.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
  raw: PropTypes.string,
  year: PropTypes.id.isRequired,
  acceptedAt: PropTypes.time,
}

CodeOfConduct.defaultProps = {
  loading: false,
  title: undefined,
  raw: undefined,
  acceptedAt: undefined,
}

export default CodeOfConduct
