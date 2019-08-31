module Mutations
  class PanicMode < BaseMutation
    description 'Panic mode'
    payload_type Boolean
    null false

    argument :year, GraphQL::Types::ID, required: true
    argument :panic, GraphQL::Types::Boolean, required: true

    def resolve(year:, panic:)
      Festival.by_year(year).first.update!(panic: panic)
      panic
    end
  end
end
