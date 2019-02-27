import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'
import CommonProps from '../../../lib/common_props'
import { IconField, Textarea } from '../../form'
import Button from '../../button'
import Presenters from './presenters'
import Levels from './levels'
import { ImageUpload } from '../../form'

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
      <section className="activity-overview">
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
        <ImageUpload image={existingImage} width={1920} height={1080} onChange={this.imageChanged}>
          <span className="image-upload__instructions">Upload an image</span>
          <small className="image-upload__size">1920 &times; 1080 pixels</small>
        </ImageUpload>
        <IconField icon="text" label="Description">
          <Textarea value={description || ''} minRows={5} onChange={this.descriptionChanged} />
        </IconField>
        <Button
          primary
          text={saving ? 'Saving…' : 'Save changes'}
          disabled={saving || !changed}
          onClick={this.save}
        />
      </section>
    )
  }
}

export default Overview
