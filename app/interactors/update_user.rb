class UpdateUser < Interaction
  def call
    access_denied! unless can? :update, user

    user.update!(attributes_for_update)
    user.image.purge if deleting_image?
  end

  delegate :user, :attributes, to: :context

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
