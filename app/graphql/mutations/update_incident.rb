module Mutations
  class UpdateIncident < BaseMutation
    payload_type Types::Incident
    null false

    argument :id, ID, required: true
    argument :body, String, required: false
    argument :state, String, required: false

    def resolve(id:, **attributes)
      ::Incident.find(id).tap do |incident|
        incident.update!(attributes)
      end
    end
  end
end
