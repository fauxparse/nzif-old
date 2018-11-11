# frozen_string_literal: true

require 'simplecov'

SimpleCov.start('rails') do
  add_filter do |source_file|
    source_file.lines.count < 7
  end

  add_group 'Services', %w(app/interactors app/services)
  add_group 'GraphQL', 'app/graphql'
end
