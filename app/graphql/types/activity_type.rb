module Types
  class ActivityType < BaseScalar
    description 'A type of activity'
    graphql_name 'ActivityType'

    def self.coerce_input(input_value, _context)
      input_value.presence&.camelize
    end

    def self.coerce_result(ruby_value, _context)
      ruby_value.presence&.demodulize&.underscore
    end
  end
end
