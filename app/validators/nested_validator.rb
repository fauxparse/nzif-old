class NestedValidator < ActiveModel::EachValidator
  def validate_each(record, _attribute, value)
    Array(value).each do |child|
      add_errors_from(child, record: record) unless child.valid?
    end
  end

  private

  def add_errors_from(child, record:)
    child.errors.each do |attr, message|
      record.errors.add(attr, message)
    end
  end
end
