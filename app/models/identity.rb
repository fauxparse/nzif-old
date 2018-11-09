class Identity < ApplicationRecord
  belongs_to :user
end

require_dependency 'identity/password'
