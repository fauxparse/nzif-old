import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'lib/proptypes'
import Label from 'atoms/label'
import Field from 'molecules/field'
import LabelledField from 'molecules/labelled_field'
import Tags from 'molecules/tags'
import Chooser from 'molecules/chooser'
import { ImageUpload } from 'components/form'

const Details = ({ activity, presenters, onChange }) => {
  const presentersById = useMemo(() => (
    presenters.reduce((h, p) => ({ ...h, [p.id]: p }), {})
  ), [presenters])

  const presenterOptions = useMemo(() => presenters.map(p => ({
    id: p.id,
    label: p.name
  })), [presenters])

  const selectedPresenters = useMemo(() => (
    activity.presenters.map(p => presenterOptions.find(q => p.id === q.id)).filter(Boolean)
  ), [activity, presenterOptions])

  const presentersChanged = useCallback((options) => {
    onChange({ presenters: options.map(p => presentersById[p.id]) })
  }, [onChange, presentersById])

  const [description, setDescription] = useState(activity.description)

  useEffect(() => setDescription(activity.description), [setDescription, activity])

  const descriptionChanged = useCallback(e => setDescription(e.target.value), [setDescription])

  const descriptionUpdated = useCallback(() => {
    if (description !== activity.description) onChange({ description })
  }, [onChange, activity, description])

  const imageChanged = useCallback(image => onChange({ image }), [onChange])

  const levelsChanged = useCallback(levels => onChange({ levels }), [onChange])

  return (
    <div className="edit-activity__details">
      <Field icon="users">
        <Label>Presenters</Label>
        <Chooser
          options={presenterOptions}
          selected={selectedPresenters}
          placeholder="Select presenters…"
          onChange={presentersChanged}
        />
      </Field>
      {activity.levels && (
        <Field icon="levels">
          <Label>Levels</Label>
          <Tags
            tags={['beginner', 'intermediate', 'advanced']}
            selected={activity.levels}
            onChange={levelsChanged}
          />
        </Field>
      )}
      <LabelledField
        label="Description"
        icon="text"
        name="description"
        multiline
        rows={1}
        autoSize
        value={description}
        onChange={descriptionChanged}
        onBlur={descriptionUpdated}
      />
      <ImageUpload image={activity.image} width={1920} height={1080} onChange={imageChanged}>
        <span className="image-upload__instructions">Upload an image</span>
        <small className="image-upload__size">1920 &times; 1080 pixels</small>
      </ImageUpload>
    </div>
  )
}

Details.propTypes = {
  activity: PropTypes.activity.isRequired,
  presenters: PropTypes.arrayOf(PropTypes.user.isRequired),
  onChange: PropTypes.func.isRequired,
}

Details.defaultProps = {
  presenters: [],
}

export default Details
