module Mutations
  class UpdateUser < BaseMutation
    description 'Update a user'
    payload_type Types::User
    null false

    argument :id, ID, required: true
    argument :attributes, Types::UserAttributes, required: true

    def resolve(id:, attributes:)
      ::UpdateUser.call(
        current_user: current_user,
        user: ::User.find(id),
        attributes: attributes.to_h
      ).user
    end
  end
end
