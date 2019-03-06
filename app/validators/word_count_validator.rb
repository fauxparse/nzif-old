class WordCountValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    check_word_count(record, attribute, value || '') if value.present? || !allow_blank?
  end

  private

  def allow_blank?
    options[:allow_blank].present?
  end

  def check_word_count(record, attribute, value)
    count = value.scan(/\w+/).size
    min = options[:min]&.to_i
    max = options[:max]&.to_i

    add_error(record, attribute, count, :too_short, count: count, min: min) \
      if min.present? && count < min
    add_error(record, attribute, count, :too_long, count: count, max: max) \
      if max.present? && count > max
  end

  def add_error(record, attribute, count, message, interpolations = {})
    record.errors.add(
      attribute,
      options[:message] ||
        I18n.t(message, interpolations.merge(scope: 'errors.messages.word_count'))
    )
  end
end
