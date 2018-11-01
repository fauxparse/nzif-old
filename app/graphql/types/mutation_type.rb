module Types
  class MutationType < Types::BaseObject
    private

    def festival_by_year(year)
      Festival.by_year(year).first!
    end
  end
end
