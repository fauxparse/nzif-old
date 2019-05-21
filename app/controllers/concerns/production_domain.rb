module ProductionDomain
  extend ActiveSupport::Concern

  included do
    before_action :redirect_to_production_domain, unless: :on_production_domain?
  end

  private

  def production_domain
    Rails.application.routes.default_url_options[:host]
  end

  def on_production_domain?
    request.env['HTTP_HOST'] == production_domain
  end

  def redirect_to_production_domain
    redirect_to "https://#{production_domain}#{request.fullpath}", status: 301
  end
end
