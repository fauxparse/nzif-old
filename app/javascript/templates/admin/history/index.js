import React, { Fragment, useEffect, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import Loader from 'atoms/loader'
import Breadcrumbs from 'molecules/breadcrumbs'
import HistoryList from 'molecules/history_list'
import Search from 'molecules/search'
import Header from 'organisms/header'
import { useOnScreen } from 'lib/hooks'
import { useFestival } from 'contexts/festival'

import './index.scss'

const History = ({
  loading,
  items,
  query,
  moreAvailable,
  fetchingMore,
  onFetchMore,
  onQueryChanged,
}) => {
  const festival = useFestival()

  const bottom = useRef()

  const atBottom = useOnScreen(bottom)

  useEffect(() => {
    if (onFetchMore && atBottom && !fetchingMore && moreAvailable) {
      onFetchMore()
    }
  }, [onFetchMore, fetchingMore, atBottom, moreAvailable])

  return (
    <section className="history">
      <Header>
        {festival && festival.adminRoot && (
          <Breadcrumbs back={festival.adminRoot}>
            <Breadcrumbs.Link to={festival.adminRoot}>Dashboard</Breadcrumbs.Link>
          </Breadcrumbs>
        )}
        <Header.Title>History</Header.Title>
        <Search
          className="registrations__search"
          value={query}
          onChange={onQueryChanged}
          autoFocus
        />
      </Header>
      <div className="history__body">
        {loading ? <Loader /> : (
          <Fragment>
            <HistoryList items={items} />
            <div ref={bottom} className="history__list-bottom" />
          </Fragment>
        )}
      </div>
    </section>
  )
}

History.propTypes = {
  items: PropTypes.arrayOf(PropTypes.historyItem),
  query: PropTypes.string,
  loading: PropTypes.bool,
  moreAvailable: PropTypes.bool,
  fetchingMore: PropTypes.bool,
  onFetchMore: PropTypes.func,
  onQueryChanged: PropTypes.func,
}

History.defaultProps = {
  items: [],
  query: undefined,
  loading: false,
  moreAvailable: false,
  fetchingMore: false,
  onFetchMore: undefined,
  onQueryChanged: undefined,
}

export default History