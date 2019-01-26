/* eslint-disable react/display-name */

import React, { Component } from 'react'
import styled from 'styled-components'
import { Select } from '../../components/form'

const SelectDemoContainer = styled.div`
  margin: 2rem;
`

class SelectDemo extends Component {
  state = {}

  render() {
    const { value } = this.state

    return (
      <SelectDemoContainer>
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
      </SelectDemoContainer>
    )
  }
}

export default () => (
  <SelectDemo />
)
