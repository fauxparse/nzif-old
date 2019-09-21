module Types
  class BaseObject < GraphQL::Schema::Object
    def id
      object.to_param
    end

    private

    def environment
      context[:environment]
    end

    delegate :can?, :authorize!, :url_for, to: :environment
  end
end
