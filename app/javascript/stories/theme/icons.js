/* eslint-disable react/display-name */

import React from 'react'
import Icon from '../../components/icons'
import ICONS from '../../components/icons/all'

class IconList extends React.Component {
  render() {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(12em, 1fr))',
        padding: '1em',
      }}>
        {ICONS.sort().map(icon => (
          <div
            key={icon}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5em',
            }}
          >
            <Icon name={icon} style={{ marginRight: '1em' }} />
            <div style={{ flex: 1 }}>{icon}</div>
          </div>
        ))}
      </div>
    )
  }
}

export default () => <IconList />
