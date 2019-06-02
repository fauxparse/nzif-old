class UpdateContent < Interaction
  def call
    access_denied! unless can? :update, content

    content.update!(attributes)
  end

  delegate :content, :attributes, to: :context
end
