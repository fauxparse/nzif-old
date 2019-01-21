module Types
  class ActivityImage < Types::BaseObject
    field :name, String, null: false
    field :thumbnail, String, null: false
    field :full, String, null: false
    field :original, String, null: false

    def name
      object.filename
    end

    def thumbnail
      url_for(variant(width: 384, height: 216))
    end

    def full
      url_for(variant(width: 1920, height: 1080))
    end

    def original
      url_for(object)
    end

    private

    def variant(width:, height:)
      object.variant(
        resize: "#{width}x#{height}^",
        extent: "#{width}x#{height}",
        gravity: 'center'
      )
    end
  end
end
