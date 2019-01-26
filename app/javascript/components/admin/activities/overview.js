import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import pick from 'lodash/pick'
import CommonProps from '../../../lib/proptypes'
import { IconField, Textarea } from '../../form'
import Button from '../../button'
import Presenters from './presenters'
import Levels from './levels'
import { ImageUpload } from '../../form'

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
    presenters: this.props.activity.presenters.slice(0).map(p => pick(p, ['id', 'name'])),
    levels: this.props.activity.levels.slice(0),
    existingImage: this.props.activity.image,
    changed: false,
  }

  componentDidUpdate(prevProps) {
    const { activity = {} } = this.props
    if (activity !== prevProps.activity) {
      this.setState({ existingImage: activity.image })
    }
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

  presentersChanged = (presenters) => this.setState({ presenters, changed: true })

  imageChanged = (image) => {
    this.setState({ image, changed: true })
    if (!image) {
      this.setState({ existingImage: null })
    }
  }

  save = () => {
    this.props.onChange(
      pick(this.state, [
        'description',
        'presenters',
        this.props.activity.levels && 'levels',
        this.state.hasOwnProperty('image') && 'image',
      ].filter(Boolean))
    )
    this.setState({ changed: false })
  }

  render() {
    const { activity, saving } = this.props
    const { description, presenters, levels, existingImage, changed } = this.state

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
        <ImageUpload image={existingImage} onChange={this.imageChanged} />
        <IconField icon="text" label="Description">
          <Textarea value={description || ''} minRows={5} onChange={this.descriptionChanged} />
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
