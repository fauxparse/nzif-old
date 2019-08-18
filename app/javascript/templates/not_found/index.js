import React from 'react'
import TextLink from 'atoms/text_link'
import Breadcrumbs from 'molecules/breadcrumbs'
import Header from 'organisms/header'

const NotFound = () => (
  <section className="static-content__page">
    <Header colored>
      <Breadcrumbs back="/">
        <Breadcrumbs.Link to="/">
          Home
        </Breadcrumbs.Link>
      </Breadcrumbs>
      <Header.Title>No, but.</Header.Title>
    </Header>
    <div className="static-content__container">
      <div className="static-content">
        <p>Sorry, we couldn’t find what you were looking for.</p>
        <p>Try going back to <TextLink to="/">the home page</TextLink>.</p>
      </div>
    </div>
  </section>
)

export default NotFound
