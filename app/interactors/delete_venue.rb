class DeleteVenue < Interaction
  def call
    access_denied! unless can? :destroy, venue

    venue.destroy!
  end

  delegate :venue, to: :context
end
