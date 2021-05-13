class Pitch
  class Info < Hashie::Dash
    include Hashie::Extensions::Dash::Coercion
    include Hashie::Extensions::Dash::IndifferentAccess

    property :presenters, coerce: Array[Pitch::Presenter], default: []
    property :company, coerce: String, default: ''
    property :bio, coerce: String, default: ''
    property :availability, coerce: String, default: ''
    property :presented_before, coerce: String, default: ''
    property :nz_based, coerce: :to_bool.to_proc, default: false
    property :payment, coerce: :to_bool.to_proc, default: false
    property :transport, coerce: :to_bool.to_proc, default: false
    property :expenses, coerce: :to_bool.to_proc, default: false
    property :code_of_conduct, coerce: :to_bool.to_proc, default: false
    property :activity_type, coerce: String, default: 'workshop'
    property :workshop_description, coerce: String
    property :workshop_reason, coerce: String
    property :workshop_requirements, coerce: String
    property :workshop_tech, coerce: String
    property :activity_levels, coerce: Array[String], default: []
    property :participant_count, coerce: Integer, default: 16
    property :taught_before, coerce: String
    property :teens, coerce: :to_bool.to_proc, default: false
    property :other_info, coerce: String
    property :show_description, coerce: String
    property :show_details, coerce: String
    property :show_why, coerce: String
    property :show_tech, coerce: String
    property :cast_size, coerce: Integer, default: 6
    property :casting, coerce: String
    property :cast_details, coerce: String
    property :cast_requirements, coerce: String
    property :performed_before, coerce: String
    property :experience, coerce: String
    property :accessibility, coerce: String
    property :slots, default: []
    property :pile, coerce: String
    property :gender, coerce: String
    property :origin, coerce: String

    coerce_key :slots, ->(values) do
      values.map { |v| v&.to_time&.in_time_zone }
    end
  end
end
