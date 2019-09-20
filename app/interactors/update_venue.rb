class UpdateVenue < Interaction
  def call
    access_denied! unless can? :update, venue

    venue.update!(attributes)
  end

  delegate :venue, :attributes, to: :context
end
