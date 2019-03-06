module Mutations
  class UpdatePitch < BaseMutation
    description 'Update a pitch'
    payload_type Types::Pitch
    null false

    argument :year, ID, required: false
    argument :attributes, Types::PitchAttributes, required: true

    def resolve(year: nil, attributes:)
      ::UpdatePitch.call(
        pitch: pitch(year: year, id: attributes.id),
        attributes: attributes.to_h,
        current_user: current_user
      ).pitch
    end

    private

    def pitch(year:, id:)
      if id.present?
        festival(year: year).pitches.find_by_hashid(id)
      else
        festival(year: year).pitches.build
      end
    end

    def festival(year: nil)
      if year
        ::Festival.by_year(year).first!
      else
        ::Festival.last!
      end
    end
  end
end
