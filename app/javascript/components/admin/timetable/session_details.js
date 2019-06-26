import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import upperFirst from 'lodash/upperFirst'
import CommonProps from '../../../lib/common_props'
import Date from '../../shared/date'
import Time from '../../shared/time'
import Icon from '../../../atoms/icon'
import Button from '../../../atoms/button'
import VenuePicker from '../activities/venue_picker'
import { IconField } from '../../form'

class SessionDetails extends Component {
  static propTypes = {
    session: CommonProps.session,
    onDelete: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onShowDetails: PropTypes.func.isRequired,
  }

  static defaultProps = {
    session: undefined,
  }

  static getDerivedStateFromProps = ({ session }) => (session ? { session } : {})

  state = {}

  delete = () => {
    const { onDelete, onClose } = this.props
    onDelete(this.state.session)
    onClose()
  }

  duplicate = () => {
    const { onDuplicate, onClose } = this.props
    onDuplicate(this.state.session)
    onClose()
  }

  showDetails = () => {
    const { onShowDetails, onClose } = this.props
    onShowDetails(this.url())
    onClose()
  }

  url = () => {
    const { session } = this.state
    return session.activity.url.replace(/^\/(\d+)/, (_, year) => `/admin/${year}/activities`) +
      `/${session.id}`
  }

  venueChanged = (venue) => {
    const { session: { id }, onChange } = this.props
    const { id: venueId } = venue
    onChange({ id, venueId })
  }

  render() {
    const {
      className,
      session: _session,
      onDelete,
      onDuplicate,
      onClose,
      onShowDetails,
      ...props
    } = this.props
    const { session } = this.state
    const { activity, startsAt, endsAt } = session

    return (
      <div className={classNames('session-summary', className)} {...props}>
        <div className="session-summary__actions">
          <Button className="session-summary__action" icon="trash" onClick={this.delete} />
          <Button className="session-summary__action" icon="copy" onClick={this.duplicate} />
          <Button className="session-summary__action" icon="close" onClick={onClose} />
        </div>
        <Icon className="session-summary__icon" name={activity.type} />
        <h3 className="session-summary__activity-name">{activity.name}</h3>
        <div className="session-summary__row">
          <Time time={[startsAt, endsAt]} />
          {', '}
          <Date date={startsAt} />
        </div>
        <div className="session-summary__row">
          <IconField icon="venue" label="Venue">
            <VenuePicker value={session.venue} onChange={this.venueChanged} />
          </IconField>
        </div>
        <div className="session-summary__buttons">
          <Button onClick={this.showDetails}>
            {upperFirst(activity.type)} details
          </Button>
        </div>
      </div>
    )
  }
}

export default SessionDetails
