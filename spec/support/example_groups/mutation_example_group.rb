require 'support/graphql_helpers'

module MutationExampleGroup
  extend ActiveSupport::Concern
  include RSpec::Rails::RailsExampleGroup
  include GraphqlHelpers

  RSpec.configure do |config|
    config.include self, type: :mutation, file_path: %r{spec/graphql/mutations}
  end
end
