module Authorisable
  extend ActiveSupport::Concern

  included do
    composed_of :roles,
      class_name: 'Set',
      mapping: %w(authorised_roles to_a),
      converter: ->(value) { Set.new(value&.map(&:to_s)) }

    validate :ensure_valid_roles

    roles.each do |role|
      define_method :"#{role}?" do
        has_role?(role)
      end

      scope :"#{role}", -> { where %Q('#{role}' = ANY(authorised_roles)) }
    end
  end

  module ClassMethods
    def roles
      @roles ||= AccessPolicy.new(nil).roles.map { |r| r.name.to_s } - %w(guest)
    end
  end

  def has_role?(role)
    roles.include?(role.to_s)
  end

  def ensure_valid_roles
    roles.each do |role|
      errors.add(:roles, :invalid_role, role: role) unless self.class.roles.include?(role)
    end
  end
end
