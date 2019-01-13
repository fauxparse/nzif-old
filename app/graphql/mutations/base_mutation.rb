module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    private

    def festival_by_year(year)
      ::Festival.by_year(year).first!
    end
  end
end
