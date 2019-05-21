class ApplicationController < ActionController::Base
  include Authentication
  include ProductionDomain if Rails.env.production?
end
