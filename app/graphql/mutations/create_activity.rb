module Mutations
  class CreateActivity < BaseMutation
    description 'Create an activity'
    payload_type Types::Activity
    null false

    argument :year, Integer, required: true
    argument :type, Types::ActivityType, required: true
    argument :attributes, Types::ActivityAttributes, required: true

    def resolve(year:, type:, attributes:)
      ::CreateActivity.call(
        festival: festival_by_year(year),
        attributes: attributes.to_h.merge(type: type)
      ).activity
    end
  end
end
