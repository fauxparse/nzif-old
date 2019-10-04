import React, { Fragment, useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import Checkbox from 'atoms/checkbox'
import Date from 'atoms/date'
import Loader from 'atoms/loader'
import Breadcrumbs from 'molecules/breadcrumbs'
import Markdown from 'molecules/markdown'
import Header from 'organisms/header'

const Details = ({ festival, incident, onChange }) => {
  const back = `${festival.adminRoot || ''}/incidents`

  const closedChanged = useCallback((e) => {
    onChange({
      state: e.target.checked ? 'closed' : 'open',
    })
  }, [onChange])

  return (
    <section className="incident-details">
      <Header>
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>Incidents</Breadcrumbs.Link>
        </Breadcrumbs>
        <Header.Title>Incident details</Header.Title>
        {incident && (
          <Fragment>
            <h2 className="incident-details__summary">
              Reported {incident.user ? `by ${incident.user.name} ` : 'anonymously '}
              on <Date date={incident.createdAt} />
            </h2>
            <Checkbox
              checked={incident.state === 'closed'}
              onChange={closedChanged}
            >
              Mark as closed
            </Checkbox>
          </Fragment>
        )}
      </Header>
      {incident ? (
        <div className="incident-details__body">
          <Markdown text={incident.body} />
        </div>
      ): <Loader />}
    </section>
  )  
}

Details.propTypes = {
  festival: PropTypes.festival.isRequired,
  incident: PropTypes.shape({
    id: PropTypes.id,
    state: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.time.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
  onChange: PropTypes.func.isRequired,
}

Details.defaultProps = {
  incident: null,
}

export default Details