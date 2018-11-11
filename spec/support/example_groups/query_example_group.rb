require 'support/graphql_helpers'

module QueryExampleGroup
  extend ActiveSupport::Concern
  include RSpec::Rails::RailsExampleGroup
  include GraphqlHelpers

  RSpec.configure do |config|
    config.include self, type: :query, file_path: %r{spec/graphql/queries}
  end
end
