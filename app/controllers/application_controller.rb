class ApplicationController < ActionController::Base
  include Authentication
  include ProductionDomain if Rails.env.production?

  before_action :set_paper_trail_whodunnit

  before_bugsnag_notify :add_user_info_to_bugsnag

  private

  def add_user_info_to_bugsnag(report)
    return if current_user.blank?

    report.user = {
      id: current_user.id,
      name: current_user.name,
      email: current_user.email,
    }
  end
end
