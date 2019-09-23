import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import List from 'molecules/list'
import HistoryListItem from './history_list_item'

const HistoryList = ({ className, items, ...props }) => (
  <List className={classNames('history-list', className)} {...props}>
    {items.map(item => <HistoryListItem key={item.id} {...item} />)}
  </List>
)

HistoryList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.historyItem.isRequired).isRequired,
}

export default HistoryList