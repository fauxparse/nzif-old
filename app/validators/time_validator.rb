class TimeValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    OPERATORS.keys.each do |operator|
      compare_times(record, attribute, value, operator) if options.include?(operator)
    end
  end

  private

  OPERATORS = {
    before:       :<,
    after:        :>,
    at_or_before: :<=,
    at_or_after:  :>=,
    at:           :==,
  }.freeze

  def fetch_time(record, time)
    if time.respond_to?(:call)
      time.call(record)
    elsif time.respond_to?(:to_time)
      time.to_time
    else
      record.send(time)
    end
  end

  def compare_times(record, attribute, value, operator)
    other_time = fetch_time(record, options[operator])
    if value.present? && other_time.present? && !value.send(OPERATORS[operator], other_time)
      record.errors.add(attribute, error_message(operator, other_time))
    end
  end

  def error_message(operator, other_time)
    options[:message] ||
      I18n.t(
        operator,
        scope: 'errors.messages.time',
        time: I18n.l(other_time, format: :long)
      )
  end
end
