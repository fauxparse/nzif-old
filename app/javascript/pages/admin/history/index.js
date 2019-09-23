import React, { useCallback, useState } from 'react'
import { useQuery } from 'react-apollo'
import Template from 'templates/admin/history'
import HISTORY from 'queries/history'

const History = () => {
  const [query, setQuery] = useState('')

  const { loading, data, fetchMore } = useQuery(HISTORY, { variables: { query } })

  const [fetchingMore, setFetchingMore] = useState(false)

  const [moreAvailable, setMoreAvailable] = useState(true)

  const fetchNextPage = useCallback(() => {
    const last = data.history[data.history.length - 1]
    if (!last || fetchingMore) return

    setFetchingMore(true)
    fetchMore({
      variables: { before: last.id },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.history.length) {
          setMoreAvailable(false)
          return prev
        }
        return { ...prev, history: [...prev.history, ...fetchMoreResult.history] }
      }
    }).then(() => setFetchingMore(false))
  }, [fetchMore, fetchingMore, setFetchingMore, setMoreAvailable, data])

  return (
    <Template
      loading={loading}
      items={data.history}
      query={query}
      fetchingMore={fetchingMore}
      moreAvailable={moreAvailable}
      onFetchMore={fetchNextPage}
      onQueryChanged={setQuery}
    />
  )
}

export default History