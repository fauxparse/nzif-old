class DateValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    OPERATORS.keys.each do |operator|
      compare_dates(record, attribute, value, operator) if options.include?(operator)
    end
  end

  private

  OPERATORS = {
    before:       :<,
    after:        :>,
    on_or_before: :<=,
    on_or_after:  :>=,
    on:           :==,
  }.freeze

  def fetch_date(record, date)
    if date.respond_to?(:call)
      date.call(record)
    elsif date.respond_to?(:to_date)
      date.to_date
    else
      record.send(date)
    end
  end

  def compare_dates(record, attribute, value, operator)
    other_date = fetch_date(record, options[operator])
    if value && other_date && !value.send(OPERATORS[operator], other_date)
      record.errors.add(attribute, error_message(operator, other_date))
    end
  end

  def error_message(operator, other_date)
    options[:message] ||
      I18n.t(
        operator,
        scope: 'errors.messages.date',
        date: I18n.l(other_date, format: :long)
      )
  end
end
