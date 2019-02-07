import React from 'react'
import PropTypes from 'prop-types'
import CommonProps from '../../lib/common_props'
import Markdown from '../shared/markdown'
import Presenter from '../shared/presenter'
import Avatar from '../shared/avatar'

const Presenters = ({ presenters }) => (
  <section className="activity-presenters">
    {presenters.map(({ __typename, ...presenter }) => (
      <div key={presenter.id} className="presenter-details">
        <Avatar className="presenter-details__avatar" {...presenter} />
        <h3 className="presenter-details__name"><Presenter {...presenter} /></h3>
        {presenter.bio && (
          <div className="presenter-details__bio">
            <Markdown text={presenter.bio} />
          </div>
        )}
      </div>
    ))}
  </section>
)

Presenters.propTypes = {
  presenters: PropTypes.arrayOf(PropTypes.shape({
    id: CommonProps.id.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
  }).isRequired),
}

export default Presenters
