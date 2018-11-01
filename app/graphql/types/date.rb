module Types
  class Date < BaseScalar
    description 'A date'

    def self.coerce_input(input_value, _context)
      return nil if input_value.blank?
      input_value.to_date
    rescue ArgumentError
      raise GraphQL::CoercionError, "#{input_value.inspect} is not a valid date"
    end

    def self.coerce_result(ruby_value, _context)
      return nil if ruby_value.blank?
      ruby_value.to_date.to_s(:db)
    end
  end
end
