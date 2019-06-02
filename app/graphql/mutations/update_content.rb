module Mutations
  class UpdateContent < BaseMutation
    description 'Update static content'
    payload_type Types::Content
    null false

    argument :slug, String, required: true
    argument :attributes, Types::ContentAttributes, required: true

    def resolve(slug: nil, attributes:)
      ::UpdateContent.call(
        content: ::Content.find_or_initialize_by(slug: slug),
        attributes: attributes.to_h,
        current_user: current_user
      ).content
    end
  end
end
