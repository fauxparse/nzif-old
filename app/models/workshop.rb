require 'set'

class Workshop < Activity
  LEVELS = %w(beginner intermediate advanced).freeze

  composed_of :levels,
    class_name: 'Set',
    mapping: %w(experience_levels to_a),
    converter: ->(value) { Set.new(value) }

  validate :ensure_valid_levels

  private

  def ensure_valid_levels
    levels.each do |level|
      errors.add(:levels, :invalid_level, level: level) unless LEVELS.include?(level)
    end
  end
end
