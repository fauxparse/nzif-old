module Types
  class QueryType
    field :countries, [String], null: false do
      description 'Get a list of countries'
    end

    def countries
      ::ISO3166::Country.all.map(&:name).sort
    end
  end
end
