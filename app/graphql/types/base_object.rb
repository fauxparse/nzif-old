module Types
  class BaseObject < GraphQL::Schema::Object
    private

    def environment
      context[:environment]
    end

    delegate :can?, :authorize!, :url_for, to: :environment
  end
end
