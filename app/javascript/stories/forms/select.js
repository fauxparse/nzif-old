/* eslint-disable react/display-name */

import React, { Component } from 'react'
import { Select } from '../../components/form'

class SelectDemo extends Component {
  state = {}

  render() {
    const { value } = this.state

    return (
      <Select
        value={value}
        options={[
          'Gryffindor',
          'Ravenclaw',
          'Hufflepuff',
          'Slytherin',
        ]}
        onChange={value => this.setState({ value })}
      />
    )
  }
}

export default () => (
  <SelectDemo />
)
