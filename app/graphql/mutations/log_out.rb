module Types
  class MutationType
    field :log_out, Boolean, null: false, description: 'Log out'

    def log_out
      context[:environment].current_user = nil
      true
    end
  end
end
