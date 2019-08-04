class PromotePitch
  include Interactor

  def call
    context.show = show if has_show?
    context.workshop = workshop if has_workshop?
  end

  delegate :pitch, to: :context
  delegate :festival, to: :pitch

  private

  def has_workshop?
    pitch.info.activity_type != 'season' &&
      pitch.info.workshop_description.strip.length > 5
  end

  def has_show?
    pitch.info.activity_type != 'workshop'
  end

  def show
    @show ||= existing_show || create_activity(festival.shows) do |show|
      show.description = pitch.info.show_description
    end
  end

  def workshop
    @workshop ||= existing_workshop || create_activity(festival.workshops) do |workshop|
      workshop.description = pitch.info.workshop_description
      workshop.levels = pitch.info.activity_levels
    end
  end

  def existing_workshop
    festival.workshops.find_by(pitch_id: pitch.id)
  end

  def existing_show
    festival.shows.find_by(pitch_id: pitch.id)
  end

  def create_activity(association, &block)
    association.build do |activity|
      activity.pitch = pitch
      activity.name = pitch.name
      add_presenters(activity)
      yield activity
      activity.save!
    end
  end

  def add_presenters(activity)
    pitch.info.presenters.each do |presenter|
      activity.presenters.build(user_id: user_for_presenter(presenter).id, activity: activity)
    end
  end

  def user_for_presenter(presenter)
    if presenter.id.present?
      User.find(presenter.id)
    else
      User.find_by_email(presenter.email) ||
        User.create!(presenter.slice('name', 'email', 'bio', 'company'))
    end
  end
end
