class Pitch
  class Presenter < Hashie::Dash
    include Hashie::Extensions::Dash::Coercion
    include Hashie::Extensions::Dash::IndifferentAccess

    property :id
    property :name, coerce: String, default: ''
    property :email, coerce: String, default: ''
    property :city, coerce: String, default: ''
    property :country, coerce: String, default: 'Aotearoa (New Zealand)'

    def ==(user)
      email.downcase == user.email.downcase
    end
  end
end
