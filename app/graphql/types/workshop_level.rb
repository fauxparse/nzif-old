module Types
  class WorkshopLevel < Types::BaseEnum
    ::Workshop::LEVELS.each do |level|
      value level
    end
  end
end
