import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import sortBy from 'lodash/sortBy'
import { useQuery } from 'react-apollo-hooks'
import Loader from 'atoms/loader'
import ListItem from 'molecules/list_item'
import Link from '../../shared/ripple/link'
import moment from '../../../lib/moment'
import Content from './list_item'
import { CONTENTS_QUERY } from '../../../queries'

const ContentList = ({ match }) => {
  const timer = useRef()

  const { loading, data } = useQuery(CONTENTS_QUERY)

  const contents = useMemo(
    () => !loading && sortBy(data.contents, [content => content.title.toLowerCase()]),
    [loading, data]
  )

  const [now, setNow] = useState(moment())

  useEffect(() => {
    timer.current = setInterval(() => setNow(moment()), 15000)
    return () => clearInterval(timer.current)
  }, [setNow])

  return (
    <div className="content__list">
      <header>
        <h1 className="page-title">Content</h1>
      </header>

      {loading ? <Loader /> : (
        <ul className="list">
          {contents.map(content => (
            <Content
              key={content.slug}
              content={content}
              now={now}
              baseUrl={match.url}
            />
          ))}
          <ListItem
            as={Link}
            to={`${match.url}/new`}
            className="list-item__link"
            icon="add"
            primary="New content"
          />
        </ul>
      )}
    </div>
  )
}

ContentList.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default ContentList
