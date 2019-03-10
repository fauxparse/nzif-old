import React from 'react'
import classNames from 'classnames'
import { useQuery } from 'react-apollo-hooks'
import { PITCHES_QUERY } from '../../queries'
import { Link } from '../shared/ripple'
import Breadcrumbs from '../shared/breadcrumbs'
import Loader from '../shared/loader'
import Button from '../button'
import Pitch from './pitch'

const PitchList = ({ match, className }) => {
  const { year } = match.params
  const variables = { year }
  const {
    loading,
    data: { pitches }
  } = useQuery(PITCHES_QUERY, { variables })

  return (
    <section className={classNames('public-page', 'pitches', className)}>
      <header className="pitches__header">
        <Breadcrumbs className="new-pitch__breadcrumbs" back={`/${year}`}>
          <Breadcrumbs.Link to={`/${year}`}>NZIF {year}</Breadcrumbs.Link>
        </Breadcrumbs>
        <h1 className="page-title">Pitches for NZIF {year}</h1>
        <Link
          to={`${match.url}/new`}
          className="button button--primary pitches__add"
          role="button"
        >
          <Button.Icon name="add" />
          <Button.Text>New pitch</Button.Text>
        </Link>
        <div className="pitches__list">
          {loading ? (
            <Loader />
          ) : (
            pitches.map(pitch => (
              <Pitch
                key={pitch.id}
                className="pitches__row"
                pitch={pitch}
                url={`${match.url}/${pitch.id}`}
              />
            ))
          )}
        </div>
      </header>
    </section>
  )
}

export default PitchList
