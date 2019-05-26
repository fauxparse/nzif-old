module Types
  class FractionalTime < BaseScalar
    description 'UTC time with fractional seconds'

    def self.coerce_input(input_value, _context)
      return nil if input_value.blank?
      input_value.to_time&.utc || raise(ArgumentError)
    rescue ArgumentError
      raise GraphQL::CoercionError, "#{input_value.inspect} is not a valid time"
    end

    def self.coerce_result(ruby_value, _context)
      return nil if ruby_value.blank?
      ruby_value.utc.iso8601(6)
    end
  end
end
