class UpdateRegistration < Interaction
  include ActiveModel::Validations

  class Attributes < Hashie::Mash
    include Hashie::Extensions::Mash::SymbolizeKeys
  end

  # TODO: edge case
  # * open registration page
  # * fill in valid details
  # * click Next
  # * click Back
  # * edit details
  # * click Next
  # Result: validation fails as CoC not accepted

  def call
    context.errors = errors
    update_user!
    update_registration!

  rescue ActiveRecord::RecordInvalid => e
    errors.merge!(e.record.errors)
    context.fail!
  end

  def user
    context.user ||= context.current_user || existing_user || new_user
  end

  def registration
    context.registration ||= Registration.create_or_find_by(festival: festival, user: user)
  end

  delegate :festival, to: :context

  delegate :name, :email, :password, :password_confirmation, :phone, to: :attributes

  private

  def logged_in?
    @logged_in = user&.persisted? if @logged_in.nil?
    @logged_in
  end

  def attributes
    @attributes ||= Attributes.new(context.attributes)
  end

  def update_user!
    user.attributes = attributes.slice(:name, :email, :phone)
    if user.new_record? || user.changed?
      user.save!
    end
  end

  def update_registration!
    Preference.acts_as_list_no_update do
      registration.attributes = attributes.slice(:code_of_conduct_accepted_at)
      preferences_changed = attributes.include?(:preferences) && update_preferences
      registration.save! if registration.changed? || preferences_changed
    end

  rescue ActiveRecord::RecordNotUnique
    errors.add(:preferences, 'must be unique by registration and session')
    context.fail!
  end

  def update_preferences
    existing = Set.new(registration.preferences.map { |pref| [pref.session_id, pref.position] })
    fresh = Set.new(attributes.preferences.map { |pref| [pref.session_id.to_i, pref.position] })

    return false if existing == fresh

    registration.preferences.each do |pref|
      pref.mark_for_destruction if fresh.exclude? [pref.session_id, pref.position]
    end

    (fresh - existing).each do |session_id, position|
      registration.preferences.build(session_id: session_id, position: position)
    end

    true
  end

  def existing_user
    user = User.includes(:identities).find_by_email(email)
    return nil if user.blank?

    identity = user.identities.detect { |id| id.is_a?(Identity::Password) } ||
      user.identities.build(password: password, password_confirmation: password_confirmation)

    if identity.authenticate(password)
      return user
    else
      errors.add(:password, 'is incorrect')
      return
    end
  end

  def new_user
    User.new(name: name, email: email, phone: phone).tap do |user|
      user.identities.build(
        type: 'Identity::Password',
        password: password,
        password_confirmation: password_confirmation,
      )
    end
  end

  def format_validation_errors(errors)
    errors.keys
      .reject { |key| key.to_s.include?('.') }
      .inject({}) do |hash, key|
        hash.merge(key.to_s.camelize(:lower).to_sym => errors.full_messages_for(key))
      end
  end
end
