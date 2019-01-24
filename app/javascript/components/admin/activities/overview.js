import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import pick from 'lodash/pick'
import CommonProps from '../../../lib/proptypes'
import { IconField, Textarea } from '../../form'
import Button from '../../button'
import Presenters from './presenters'
import Levels from './levels'

const OverviewSection = styled.section`
  padding: 1.5rem 0;
`

class Overview extends Component {
  static propTypes = {
    activity: CommonProps.activity,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
  }

  static defaultProps = {
    saving: false,
  }

  state = {
    description: this.props.activity.description,
    presenters: this.props.activity.presenters.slice(0),
    levels: this.props.activity.levels.slice(0),
    changed: false,
  }

  levelClicked = (e) => {
    const level = e.target.dataset.level
    const levels = new Set(this.state.levels)

    if (levels.has(level)) {
      levels.delete(level)
    } else {
      levels.add(level)
    }
    this.setState({ levels: [...levels], changed: true })
  }

  descriptionChanged = (e) => this.setState({ description: e.target.value, changed: true })

  presentersChanged = (presenters) => {
    this.setState({
      presenters: presenters.map(p => pick(p, ['id', 'name'])),
      changed: true
    })
  }

  save = () => {
    this.props.onChange(
      pick(this.state, [
        'description',
        'presenters',
        this.props.activity.levels && 'levels',
      ].filter(Boolean))
    )
    this.setState({ changed: false })
  }

  render() {
    const { activity, saving } = this.props
    const { description, presenters, levels, changed } = this.state

    return (
      <OverviewSection>
        <IconField icon="user" label="Presenters">
          <Presenters
            activity={activity}
            presenters={presenters}
            onChange={this.presentersChanged}
          />
        </IconField>
        {levels && (
          <IconField icon="levels" label="Relevant experience levels">
            <Levels levels={levels} onClick={this.levelClicked} />
          </IconField>
        )}
        <IconField icon="text" label="Description">
          <Textarea value={description} minRows={5} onChange={this.descriptionChanged} />
        </IconField>
        <Button
          primary
          text={saving ? 'Saving…' : 'Save changes'}
          disabled={saving || !changed}
          onClick={this.save}
        />
      </OverviewSection>
    )
  }
}

export default Overview
