module Transactional
  extend ActiveSupport::Concern

  included do
    around do |interactor|
      ActiveRecord::Base.transaction do
        interactor.call
      end
    end
  end
end
