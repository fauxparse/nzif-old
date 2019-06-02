module Types
  class ContentAttributes < BaseInputObject
    description 'Attributes for static content'
    argument :title, String, required: false
    argument :slug, String, required: false
    argument :raw, String, required: false
  end
end
