class Pitch
  class Info < Hashie::Dash
    include Hashie::Extensions::Dash::Coercion
    include Hashie::Extensions::Dash::IndifferentAccess

    property :presenters, coerce: Array[Pitch::Presenter], default: []
    property :company, coerce: String, default: ''
    property :bio, coerce: String, default: ''
    property :availability, coerce: String, default: ''
    property :presented_before, coerce: String, default: ''
    property :code_of_conduct, coerce: :to_bool.to_proc, default: false
    property :activity_type, coerce: String, default: 'standalone_workshop'
    property :workshop_description, coerce: String
    property :workshop_requirements, coerce: String
    property :activity_levels, coerce: Array[String], default: []
    property :participant_count, coerce: Integer, default: 16
    property :taught_before, coerce: String
    property :other_info, coerce: String
    property :show_description, coerce: String
    property :cast_size, coerce: Integer, default: 6
    property :performed_before, coerce: String
    property :experience, coerce: String
  end
end
