module Queries
  module History
    extend ActiveSupport::Concern

    included do
      field :history, [Types::HistoryItem], null: false do
        description 'List historical activity'
        argument :query, String, required: false
        argument :per_page, Integer, required: false
        argument :before, GraphQL::Types::ID, required: false
      end

      def history(query: nil, before: nil, per_page: 20)
        scope = ::History::Item.newest_first.limit(per_page)
        scope = scope.before(before) if before.present?
        scope = scope.search(query) if query.present?
        scope.all
      end
    end
  end
end
