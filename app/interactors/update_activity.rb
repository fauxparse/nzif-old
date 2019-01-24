class UpdateActivity < Interaction
  def call
    access_denied! unless can? :update, activity

    activity.update!(attributes_to_update)
    update_presenters if attributes.include?(:presenters)
  end

  delegate :activity, :attributes, to: :context

  private

  def attributes_to_update
    attributes.except(:presenters)
  end

  def update_presenters
    old_ids = activity.presenters.map(&:user_id)
    new_ids = attributes[:presenters].map(&:to_i)
    return unless old_ids != new_ids

    Presenter.acts_as_list_no_update do
      new_ids.each.with_index(1) do |id, position|
        presenter_for_user_id(id).position = position
      end
      (old_ids - new_ids).each do |id|
        presenter_for_user_id(id).mark_for_destruction
      end
      activity.save!
    end
  end

  def presenter_for_user_id(id)
    activity.presenters.detect { |p| p.user_id == id } || activity.presenters.build(user_id: id)
  end
end
