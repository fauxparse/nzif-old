module InteractorExampleGroup
  extend ActiveSupport::Concern
  include RSpec::Rails::RailsExampleGroup

  RSpec.configure do |config|
    config.include self, type: :interactor, file_path: %r{spec/interactors}
  end
end
