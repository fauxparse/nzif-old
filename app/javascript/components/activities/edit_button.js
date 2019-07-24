import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'
import { WithPermission } from '../../lib/permissions'
import Button from 'atoms/button'

const EditButton = ({ match: { params: { year, type, slug } }, activity }) => activity && (
  <WithPermission to="update" subject={activity}>
    <Button
      as={Link}
      to={`/admin/${year}/activities/${type}/${slug}`}
      className="activity-header__edit"
      icon="edit"
    />
  </WithPermission>
)

EditButton.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  activity: PropTypes.shape({}),
}

export default withRouter(EditButton)
