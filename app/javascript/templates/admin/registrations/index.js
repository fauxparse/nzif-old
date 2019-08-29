import React, { useMemo, useState } from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import deburr from 'lodash/deburr'
import sortBy from 'lodash/sortBy'
import keyBy from 'lodash/keyBy'
import MiniSearch from 'minisearch'
import Breadcrumbs from 'molecules/breadcrumbs'
import Header from 'organisms/header'
import List from 'molecules/list'
import Ripple from 'effects/ripple'
import Search from './search'
import ListItem from './list_item'

import './index.scss'

const normalize = str => deburr(str || '').toLowerCase()

const sort = registrations => sortBy(registrations, [r => normalize(r.user.name)])

const Registrations = ({ loading, festival, registrations }) => {
  const back = `/admin/${festival.year}`

  const [search, setSearch] = useState('')

  const byId = useMemo(() => keyBy(registrations, r => r.id), [registrations])

  const searcher = useMemo(() => {
    const miniSearch = new MiniSearch({
      fields: ['name'],
      extractField: (registration, field) => deburr(registration.user[field]),
      searchOptions: {
        tokenize: string => deburr(string).toLowerCase().split(/[^a-zA-Z0-9\u00C0-\u017F]+/),
        processTerm: deburr,
        prefix: true,
        fuzzy: 0.25,
      },
    })
    miniSearch.addAll(registrations)
    return miniSearch
  }, [registrations])

  const filtered = useMemo(() => {
    if (search) {
      return searcher.search(search).map(({ id }) => byId[id])
    } else {
      return registrations
    }
  }, [searcher, search, registrations, byId])

  const sorted = useMemo(() => sort(filtered), [filtered])

  return (
    <section className="registrations">
      <Header>
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>Admin</Breadcrumbs.Link>
        </Breadcrumbs>
        <Header.Title>Registrations</Header.Title>
        <Search
          className="registrations__search"
          value={search}
          onChange={setSearch}
          autoFocus
          placeholder={loading ? 'Loading…' : `Search ${registrations.length} registrations`}
          disabled={loading || undefined}
        />
      </Header>
      <div className="registrations__body">
        <List className="registrations__list">
          {sorted.map((registration) => (
            <ListItem
              key={registration.id}
              url={`/admin/${festival.year}/registrations/${registration.id}`}
              user={registration.user}
              loading={loading}
            />
          ))}
        </List>
      </div>
    </section>
  )
}

Registrations.propTypes = {
  loading: PropTypes.bool,
  festival: PropTypes.festival.isRequired,
  registrations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.id,
    user: PropTypes.user,
  }).isRequired),
}

Registrations.defaultProps = {
  loading: false,
  registrations: [],
}

export default Registrations
