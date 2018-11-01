module Types
  class Time < BaseScalar
    description 'A time'

    def self.coerce_input(input_value, _context)
      return nil if input_value.blank?
      input_value.to_time.in_time_zone
    rescue ArgumentError
      raise GraphQL::CoercionError, "#{input_value.inspect} is not a valid time"
    end

    def self.coerce_result(ruby_value, _context)
      return nil if ruby_value.blank?
      time = ruby_value.respond_to?(:iso8601) ? ruby_value : ruby_value.to_time
      time.iso8601
    end
  end
end
