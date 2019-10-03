import React, { useMemo, useState } from 'react'
import PropTypes from 'lib/proptypes'
import deburr from 'lodash/deburr'
import sortBy from 'lodash/sortBy'
import keyBy from 'lodash/keyBy'
import MiniSearch from 'minisearch'
import Breadcrumbs from 'molecules/breadcrumbs'
import List from 'molecules/list'
import Search from 'molecules/search'
import Tags from 'molecules/tags'
import Header from 'organisms/header'
import ListItem from './list_item'

import './index.scss'

const sort = incidents => sortBy(incidents, [r => r.createdAt]).reverse()

const Incidents = ({ loading, festival, incidents }) => {
  const back = `/admin/${festival.year}`

  const [search, setSearch] = useState('')

  const [filter, setFilter] = useState(['open'])

  const byId = useMemo(() => keyBy(incidents, i => i.id), [incidents])

  const filtered = useMemo(() => (
    incidents.filter(r => filter.includes(r.state))
  ), [incidents, filter])

  const searcher = useMemo(() => {
    const miniSearch = new MiniSearch({
      fields: ['name', 'body'],
      extractField: (incident, field) => {
        if (field === 'name' && incident.user) {
          return deburr(incident.user.name)
        } else {
          return deburr(incident[field] || '')
        }
      },
      searchOptions: {
        tokenize: string => deburr(string).toLowerCase().split(/[^a-zA-Z0-9\u00C0-\u017F]+/),
        processTerm: deburr,
        prefix: true,
        fuzzy: 0.25,
      },
    })
    miniSearch.addAll(filtered)
    return miniSearch
  }, [filtered])

  const sorted = useMemo(() => (
    sort(search ? searcher.search(search).map(({ id }) => byId[id]) : filtered)
  ), [searcher, search, filtered, byId])

  return (
    <section className="incidents">
      <Header className="incidents__header">
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>Admin</Breadcrumbs.Link>
        </Breadcrumbs>
        <Header.Title>Incidents</Header.Title>
        <Tags
          tags={['open', 'closed']}
          selected={filter}
          onChange={setFilter}
        />
        <Search
          className="incidents__search"
          value={search}
          onChange={setSearch}
          autoFocus
          placeholder={loading ? 'Loading…' : `Search ${filtered.length} incidents`}
          disabled={loading || undefined}
        />
      </Header>
      <div className="incidents__body">
        <List className="incidents__list">
          {sorted.map((incident) => (
            <ListItem
              key={incident.id}
              url={`/admin/${festival.year}/incidents/${incident.id}`}
              user={incident.user}
              state={incident.state}
              createdAt={incident.createdAt}
              loading={loading}
            />
          ))}
        </List>
      </div>
    </section>
  )
}

Incidents.propTypes = {
  loading: PropTypes.bool,
  festival: PropTypes.festival.isRequired,
  incidents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.id,
    state: PropTypes.string.isRequired,
    createdAt: PropTypes.time,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired),
}

Incidents.defaultProps = {
  loading: false,
  incidents: [],
}

export default Incidents
