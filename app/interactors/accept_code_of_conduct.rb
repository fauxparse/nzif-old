class AcceptCodeOfConduct < Interaction
  def call
    update_code_of_conduct if attributes.include?(:code_of_conduct_accepted_at)

  rescue ActiveRecord::RecordInvalid => e
    errors.merge!(e.record.errors)
    context.fail!
  end

  delegate :registration, :attributes, :errors, to: :context

  private

  def update_code_of_conduct
    registration.update!(code_of_conduct_accepted_at: attributes.code_of_conduct_accepted_at)
  end
end
