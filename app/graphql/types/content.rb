module Types
  class Content < Types::BaseObject
    class Version < Types::BaseObject
      field :raw, String, null: false
      field :updated_at, Types::FractionalTime, null: false

      def raw
        # a version stores the *previous* version's state
        (object.next&.reify || object.item).raw
      end

      def updated_at
        object.created_at
      end
    end

    field :title, String, null: false
    field :slug, String, null: false
    field :raw, String, null: false
    field :updated_at, Types::FractionalTime, null: false
    field :versions, [Types::Content::Version], null: false
  end
end
