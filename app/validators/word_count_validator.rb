class WordCountValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    check_word_count(record, attribute, value || '') if should_check_word_count?(value)
  end

  private

  def should_check_word_count?(value)
    value.present? || !allow_blank?
  end

  def allow_blank?
    options[:allow_blank].present?
  end

  def check_word_count(record, attribute, value)
    count = value.scan(/\w+/).size
    minimum = options[:minimum]&.to_i
    maximum = options[:maximum]&.to_i

    if minimum.present? && count < minimum
      add_error(record, attribute, count, :too_short, count: count, minimum: minimum)
    end

    if maximum.present? && count > maximum
      add_error(record, attribute, count, :too_long, count: count, maximum: maximum)
    end
  end

  def add_error(record, attribute, count, message, interpolations = {})
    record.errors.add(
      attribute,
      options[:message] ||
        I18n.t(message, interpolations.merge(scope: 'errors.messages.word_count'))
    )
  end
end
