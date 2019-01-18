module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    include AccessGranted::Rails::ControllerMethods

    private

    def festival_by_year(year)
      ::Festival.by_year(year).first!
    end

    def current_user
      context[:environment]&.current_user || User.new
    end

    def access_denied!
      raise GraphQL::ExecutionError, 'You don’t have permission to do that'
    end
  end
end
