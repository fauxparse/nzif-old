class ApplicationController < ActionController::Base
  include Authentication
  include ProductionDomain if Rails.env.production?

  before_action :set_paper_trail_whodunnit
end
