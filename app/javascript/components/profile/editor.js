import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import pick from 'lodash/pick'
import CommonProps from '../../lib/common_props'
import { ROLES, ROLE_DESCRIPTIONS } from '../../lib/roles'
import { WithPermission } from '../../lib/permissions'
import { CurrentUserContext } from '../shared/current_user'
import { CountrySelect, Errors, IconField, ImageUpload, Input, Switch, Textarea } from '../form'
import Icon from '../icons'
import Button from '../button'

class ProfileEditor extends Component {
  static propTypes = {
    className: CommonProps.className,
    user: PropTypes.shape({
      id: CommonProps.id.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      image: PropTypes.shape({}),
    }).isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    saving: false,
  }

  state = {
    ...pick(this.props.user, 'name', 'email', 'bio', 'city','country', 'roles'),
    existingImage: this.props.user.image,
    changed: false,
  }

  changed = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value, changed: true })
  }

  roleChanged = (e) => {
    const roles = new Set(this.state.roles)
    const { checked, value: role } = e.target
    if (checked) {
      roles.add(role)
    } else {
      roles.delete(role)
    }
    this.setState({ roles: Array.from(roles), changed: true })
  }

  imageChanged = (image) => {
    this.setState({ image, changed: true })
    if (!image) {
      this.setState({ existingImage: null })
    }
  }

  countryChanged = (country) => {
    this.setState({ country, changed: true })
  }

  save = (e) => {
    e && e.preventDefault()

    this.props.onChange(
      pick(this.state, [
        'name',
        'email',
        'bio',
        'city',
        'country',
        'roles',
        this.state.hasOwnProperty('image') && 'image',
      ].filter(Boolean))
    )
    this.setState({ changed: false })
  }

  canEditRole(user, role) {
    if (!user) return false

    const { id } = this.props.user
    const roles = new Set(user.roles)
    return roles.has('admin') && (role !== 'admin' || id !== user.id)
  }

  render() {
    const { className, saving, user, errors } = this.props
    const { existingImage, name, email, bio, city, country, changed } = this.state
    const roles = new Set(this.state.roles)

    return (
      <CurrentUserContext.Consumer>
        {currentUser => (
          <div className={classNames('profile-editor', className)}>
            <form className="profile-editor__form" onSubmit={this.save}>
              <ImageUpload
                image={existingImage}
                className="profile-editor__image"
                onChange={this.imageChanged}
              >
                <Icon name="upload" />
              </ImageUpload>
              <IconField className="profile-editor__name" icon="user" label="Name">
                <Input type="text" name="name" value={name} onChange={this.changed} />
              </IconField>
              <Errors from={errors} name="name" />
              <IconField icon="email" label="Email address">
                <Input type="email" name="email" value={email} onChange={this.changed} required />
              </IconField>
              <Errors from={errors} name="email" />
              <IconField icon="country" label="Country" className="profile-editor__country">
                <Input
                  type="text"
                  name="city"
                  value={city || ''}
                  onChange={this.changed}
                  placeholder="City"
                />
                <CountrySelect
                  placeholder="Country"
                  value={country}
                  onChange={this.countryChanged}
                />
              </IconField>
              <IconField icon="text" label="Bio">
                <Textarea name="bio" value={bio || ''} minRows={5} onChange={this.changed} />
              </IconField>
              <WithPermission to="editRoles" subject={user}>
                <IconField icon="role" label="Roles">
                  <div className="profile-editor__roles checkboxes">
                    {ROLES.map(role => (
                      <Switch
                        key={role}
                        name="roles[]"
                        value={role}
                        checked={roles.has(role)}
                        disabled={!this.canEditRole(currentUser, role)}
                        onChange={this.roleChanged}
                      >
                        {ROLE_DESCRIPTIONS[role]}
                      </Switch>
                    ))}
                  </div>
                </IconField>
              </WithPermission>

              <Button
                primary
                type="submit"
                text={saving ? 'Saving…' : 'Save changes'}
                disabled={!(changed || errors) || saving}
              />
            </form>
          </div>
        )}
      </CurrentUserContext.Consumer>
    )
  }
}

export default ProfileEditor
