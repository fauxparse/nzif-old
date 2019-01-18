module Types
  class UserRole < Types::BaseEnum
    ::User.roles.each do |role|
      value role
    end
  end
end
