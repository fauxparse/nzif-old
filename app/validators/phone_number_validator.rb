class PhoneNumberValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    record.errors.add(attribute, :phone_number) unless valid_phone_number?(value)
  end

  private

  def valid_phone_number?(value)
    value.present? && value =~ /\A[+()\d\s]+\z/
  end
end
