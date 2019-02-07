import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'
import { WithPermission } from '../../lib/permissions'
import Icon from '../icons'
import Link from '../shared/ripple/link'

const EditButton = ({ match: { params: { year, type, slug } }, activity }) => activity && (
  <WithPermission to="update" subject={activity}>
    <Link className="activity-header__edit" to={`/admin/${year}/activities/${type}/${slug}`}>
      <Icon name="edit" />
    </Link>
  </WithPermission>
)

EditButton.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  activity: PropTypes.shape({}),
}

export default withRouter(EditButton)
