module Nationalisable
  extend ActiveSupport::Concern

  included do
    validates :country, presence: true, if: :country_code?
  end

  def country
    return nil if country_code.blank?
    country = ISO3166::Country[country_code]
    country && (country.translations[I18n.locale.to_s] || country.name)
  end

  def country=(country_name)
    country = ISO3166::Country.find_country_by_name(country_name.to_s)
    self.country_code = country&.alpha2
  end

  def origin
    case country_code
    when nil then nil
    when 'NZ' then city || 'NZ'
    when 'AU' then city || 'Aus'
    else country
    end
  end

  def city
    super&.downcase&.upcase_first
  end
end
