module Types
  class PaymentType < BaseScalar
    description 'A type of payment'
    graphql_name 'PaymentType'

    def self.coerce_input(input_value, _context)
      input_value.presence&.camelize + 'Payment'
    end

    def self.coerce_result(ruby_value, _context)
      ruby_value.presence&.demodulize&.underscore.sub(/_payment$/, '')
    end
  end
end
