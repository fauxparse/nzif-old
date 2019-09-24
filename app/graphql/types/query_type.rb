module Types
  class QueryType < Types::BaseObject
    include Queries::Activity
    include Queries::ActivityTypes
    include Queries::Allocation
    include Queries::Content
    include Queries::Contents
    include Queries::Countries
    include Queries::CurrentUser
    include Queries::Festival
    include Queries::History
    include Queries::Payments
    include Queries::Pitch
    include Queries::Pitches
    include Queries::Registration
    include Queries::RegistrationCount
    include Queries::Registrations
    include Queries::Session
    include Queries::Sessions
    include Queries::User
    include Queries::Users
    include Queries::ValidatePasswordReset
    include Queries::Venues
  end
end
