class History::Item < ApplicationRecord
  class_attribute :description_template

  has_many :mentions, dependent: :destroy, autosave: true

  validates :description, presence: true

  def self.mentions(relationship, required: true)
    define_method(relationship) do
      find_subject_of(relationship)
    end

    define_method("#{relationship}=") do |subject|
      set_subject_of(relationship, subject)
    end

    validates relationship.to_sym, presence: true if required
  end

  def self.description(template)
    self.description_template = ERB.new(template.strip)
  end

  def description
    super || (self.description = self.class.description_template.result(binding).strip)
  end

  private

  def mention(relationship)
    mentions.detect { |m| m.relationship == relationship.to_s } ||
      mentions.build(relationship: relationship)
  end

  def find_subject_of(relationship)
    mention(relationship).subject
  end

  def set_subject_of(relationship, subject)
    mention(relationship).subject = subject
  end
end
