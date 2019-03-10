class DeletePitch < Interaction
  def call
    access_denied! unless can? :destroy, pitch

    !!pitch.destroy
  end

  delegate :pitch, to: :context
end
