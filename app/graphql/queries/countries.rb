module Types
  class QueryType
    field :countries, [String], null: false do
      description 'Get a list of countries'
    end

    def countries
      ::ISO3166::Country.all.map(&:name).sort_by { |country| I18n.transliterate(country) }
    end
  end
end
