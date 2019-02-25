module Types
  class ActivityImage < Types::BaseObject
    field :name, String, null: false
    field :thumbnail, String, null: false
    field :full, String, null: false
    field :original, String, null: false

    def name
      object.present? ? object.filename : 'placeholder.jpg'
    end

    def thumbnail
      object.present? ? url_for(variant(width: 384, height: 216)) : placeholder_url
    end

    def full
      object.present? ? url_for(variant(width: 1920, height: 1080)) : placeholder_url
    end

    def original
      object.present? ? url_for(object.image) : placeholder_url
    end

    private

    def variant(width:, height:)
      object.variant(
        resize: "#{width}x#{height}^",
        extent: "#{width}x#{height}",
        gravity: 'center'
      )
    end

    def placeholder_url
      ActionController::Base.helpers.image_path('placeholder')
    end
  end
end
