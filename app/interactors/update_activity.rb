class UpdateActivity < Interaction
  def call
    access_denied! unless can? :update, activity

    activity.update!(attributes_for_update)
    activity.image.purge if deleting_image?
  end

  delegate :activity, :attributes, to: :context

  private

  def attributes_for_update
    if deleting_image?
      attributes.except(:image)
    else
      attributes
    end
  end

  def deleting_image?
    attributes.include?(:image) && attributes[:image].blank?
  end
end
