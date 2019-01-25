module Types
  class BaseObject < GraphQL::Schema::Object
    private

    def environment
      context[:environment]
    end

    delegate :url_for, to: :environment
  end
end
