import React from 'react'
import classNames from 'classnames'
import { Link } from '../shared/ripple'
import Breadcrumbs from '../shared/breadcrumbs'
import Button from '../button'

const PitchList = ({ match, className }) => {
  const { year } = match.params

  return (
    <section className={classNames('public-page', 'pitches', className)}>
      <header className="pitches__header">
        <Breadcrumbs className="new-pitch__breadcrumbs" back={`/${year}`}>
          <Breadcrumbs.Link to={`/${year}`}>
            NZIF {year}
          </Breadcrumbs.Link>
        </Breadcrumbs>
        <h1 className="page-title">
          Pitches for NZIF {year}
        </h1>
        <Link to={`${match.url}/new`} className="button button--primary pitches__add" role="button">
          <Button.Icon name="add" />
          <Button.Text>New pitch</Button.Text>
        </Link>
      </header>
    </section>
  )
}

export default PitchList
