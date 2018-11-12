module Types
  class Time < BaseScalar
    description 'A time'

    def self.coerce_input(input_value, _context)
      return nil if input_value.blank?
      input_value.to_time&.in_time_zone || raise(ArgumentError)
    rescue ArgumentError
      raise GraphQL::CoercionError, "#{input_value.inspect} is not a valid time"
    end

    def self.coerce_result(ruby_value, _context)
      return nil if ruby_value.blank?
      ::Time.zone.parse(ruby_value.to_s).iso8601
    end
  end
end
