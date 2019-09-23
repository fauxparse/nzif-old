import React from 'react'
import PropTypes from 'lib/proptypes'
import Time from 'atoms/time'
import List from 'molecules/list'

const HistoryListItem = ({ description, icon, timestamp }) => (
  <List.Item
    className="history-list__item"
    icon={icon}
    primary={description}
  >
    <span className="list-item__secondary">
      <Time time={timestamp} format="full" />
    </span>
  </List.Item>
)

HistoryListItem.propTypes = {
  icon: PropTypes.icon.isRequired,
  description: PropTypes.string.isRequired,
  timestamp: PropTypes.time.isRequired,
}

export default HistoryListItem