import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { IconField, Textarea } from '../../form'
import Levels from './levels'

const OverviewSection = styled.section`
  padding: 1.5rem 0;
`

class Overview extends Component {
  state = {
    levels: [],
    description: '',
  }

  levelClicked = (e) => {
    const level = e.target.dataset.level
    const levels = new Set(this.state.levels)

    if (levels.has(level)) {
      levels.delete(level)
    } else {
      levels.add(level)
    }
    this.setState({ levels: [...levels] })
  }

  descriptionChanged = (e) => this.setState({ description: e.target.value })

  render() {
    const { levels, description } = this.state

    return (
      <OverviewSection>
        {levels && (
          <IconField icon="levels" label="Relevant experience levels">
            <Levels levels={levels} onClick={this.levelClicked} />
          </IconField>
        )}
        <IconField icon="text" label="Description">
          <Textarea value={description} minRows={5} onChange={this.descriptionChanged} />
        </IconField>
      </OverviewSection>
    )
  }
}

export default Overview
