class UpdateRegistration
  include Interactor::Organizer
  include ActiveModel::Validations

  class Attributes < Hashie::Mash
    include Hashie::Extensions::Mash::SymbolizeKeys
  end

  before do
    context.attributes = Attributes.new(context.attributes)
    context.errors = errors
  end

  organize(
    FindRegistrationUser,
    AcceptCodeOfConduct,
    UpdateRegistrationPreferences,
  )
end
