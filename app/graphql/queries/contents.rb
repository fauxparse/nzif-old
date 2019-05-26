module Queries
  module Contents
    extend ActiveSupport::Concern

    included do
      field :contents, [Types::Content], null: false do
        description 'Retrieve a list of static content'
      end

      def contents
        ::Content.all
      end
    end
  end
end
