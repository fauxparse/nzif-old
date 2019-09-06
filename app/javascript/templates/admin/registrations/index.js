import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'lib/proptypes'
import deburr from 'lodash/deburr'
import sortBy from 'lodash/sortBy'
import keyBy from 'lodash/keyBy'
import MiniSearch from 'minisearch'
import copy from 'copy-to-clipboard'
import Breadcrumbs from 'molecules/breadcrumbs'
import List from 'molecules/list'
import Search from 'molecules/search'
import Tags from 'molecules/tags'
import { notify } from 'molecules/toast'
import Header from 'organisms/header'
import ListItem from './list_item'

import './index.scss'

const normalize = str => deburr(str || '').toLowerCase()

const sort = registrations => sortBy(registrations, [r => normalize(r.user.name)])

const Registrations = ({ loading, festival, registrations }) => {
  const back = `/admin/${festival.year}`

  const [search, setSearch] = useState('')

  const [filter, setFilter] = useState(['complete', 'pending'])

  const byId = useMemo(() => keyBy(registrations, r => r.id), [registrations])

  const filtered = useMemo(() => (
    registrations.filter(r => filter.includes(r.state))
  ), [registrations, filter])

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
    miniSearch.addAll(filtered)
    return miniSearch
  }, [filtered])

  const sorted = useMemo(() => (
    sort(search ? searcher.search(search).map(({ id }) => byId[id]) : filtered)
  ), [searcher, search, filtered, byId])

  const copyEmailAddresses = useCallback(() => {
    const emails = sorted.map(registration => registration.user.email)
    copy(emails.join(','))
    notify(`${emails.length} email${emails.length === 1 ? '' : 's'} copied.`)
  }, [sorted])

  return (
    <section className="registrations">
      <Header className="registrations__header">
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>Admin</Breadcrumbs.Link>
        </Breadcrumbs>
        <Header.Button
          icon="copy"
          aria-label="Copy email addresses"
          onClick={copyEmailAddresses}
        />
        <Header.Title>Registrations</Header.Title>
        <Tags
          tags={['complete', 'pending']}
          selected={filter}
          onChange={setFilter}
        />
        <Search
          className="registrations__search"
          value={search}
          onChange={setSearch}
          autoFocus
          placeholder={loading ? 'Loading…' : `Search ${filtered.length} registrations`}
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
              state={registration.state}
              completedAt={registration.completedAt}
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
