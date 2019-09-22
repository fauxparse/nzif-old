class History::Item < ApplicationRecord
  include PgSearch::Model

  class_attribute :description_template

  has_many :mentions, dependent: :destroy, autosave: true

  validates :description, presence: true

  scope :oldest_first, -> { order(created_at: :asc) }
  scope :newest_first, -> { order(created_at: :desc) }

  pg_search_scope :search,
    against: %i(description),
    using: {
      tsearch: {
        dictionary: 'english',
        prefix: true,
      },
    },
    ignoring: :accents

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

  description 'Please give me a proper description'

  def description
    super || (self.description = self.class.description_template.result(binding).strip)
  end

  private

  def find_mention(relationship)
    mentions.detect { |m| m.relationship == relationship.to_s }
  end

  def find_or_build_mention(relationship)
    find_mention(relationship) || mentions.build(relationship: relationship)
  end

  def find_subject_of(relationship)
    find_mention(relationship)&.subject
  end

  def set_subject_of(relationship, subject)
    if subject.present?
      find_or_build_mention(relationship).subject = subject
    else
      # Avoids creating empty mentions for nil subjects
      mention = find_mention(relationship)
      mention.subject = subject if mention
    end
  end
end
