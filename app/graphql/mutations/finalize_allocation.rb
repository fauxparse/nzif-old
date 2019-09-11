module Mutations
  class FinalizeAllocation < BaseMutation
    description 'Finalize workshop allocation'
    payload_type Boolean
    null false

    argument :year, ID, required: true
    argument :lists, [Types::AllocationList], required: true

    def resolve(year:, lists:)
      festival = Festival.by_year(year).first

      map = lists.map do |list|
        [
          Session.decode_id(list.session_id),
          list.registration_ids.map { |id| Registration.decode_id(id) },
        ]
      end
      result = ::FinalizeAllocation.call(festival: festival, lists: map.to_h)
      result.success?
    end
  end
end
