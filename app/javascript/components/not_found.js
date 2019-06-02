import React from 'react'
import PageHeader from './shared/page_header'
import TextLink from './shared/text_link'
import Breadcrumbs from './shared/breadcrumbs'

const NotFound = () => (
  <section className="static-content__page">
    <PageHeader
      className="static-content__header"
      title="Not found"
      back="/"
      breadcrumbs={
        <Breadcrumbs.Link to={`/`}>
          Home
        </Breadcrumbs.Link>
      }
    >
      <h1 className="page-header__title">
        No, but.
      </h1>
    </PageHeader>
    <div className="static-content__container">
      <div className="static-content">
        <p>Sorry, we couldn’t find what you were looking for.</p>
        <p>Try going back to <TextLink to="/">the home page</TextLink>.</p>
      </div>
    </div>
  </section>
)

export default NotFound
