module Mutations
  class UpdateActivity < BaseMutation
    description 'Update an activity'
    payload_type Types::Activity
    null false

    argument :id, ID, required: true
    argument :attributes, Types::ActivityAttributes, required: true

    def resolve(id:, attributes:)
      ::UpdateActivity.call(
        activity: ::Activity.find(id),
        attributes: attributes.to_h
      ).activity
    end
  end
end
