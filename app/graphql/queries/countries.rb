module Queries
  module Countries
    extend ActiveSupport::Concern

    included do
      field :countries, [String], null: false do
        description 'Get a list of countries'
      end

      def countries
        ::ISO3166::Country.all.map(&:name).sort_by { |country| I18n.transliterate(country) }
      end
    end
  end
end
