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
  end
end
