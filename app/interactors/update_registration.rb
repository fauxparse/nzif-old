class UpdateRegistration
  include Interactor::Organizer
  include ActiveModel::Validations
  include AccessGranted::Rails::ControllerMethods

  class UpdateRegistrationContext < Interactor::Context
    extend ActiveModel::Translation
  end

  class Attributes < Hashie::Mash
    include Hashie::Extensions::Mash::SymbolizeKeys
  end

  def initialize(context = {})
    super UpdateRegistrationContext.new(context)
  end

  before do
    context.attributes = Attributes.new(context.attributes)
    context.errors = errors
  end

  organize(
    CheckRegistrationPermission,
    FindRegistrationUser,
    AcceptCodeOfConduct,
    UpdateRegistrationPreferences,
    UpdateWorkshopSelection,
    UpdateAvailability,
    ConfirmRegistration,
  )
end
