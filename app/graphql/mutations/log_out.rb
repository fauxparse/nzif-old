module Mutations
  class LogOut < BaseMutation
    description 'Log out'
    payload_type Boolean
    null false

    def resolve
      context[:environment].current_user = nil
      true
    end
  end
end
