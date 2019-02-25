module Types
  class ActivityImage < Types::BaseObject
    field :name, String, null: false
    field :thumbnail, String, null: false
    field :small, String, null: false
    field :medium, String, null: false
    field :full, String, null: false
    field :original, String, null: false

    def name
      object.present? ? object.filename : 'placeholder.jpg'
    end

    def thumbnail
      image_url(384, 216)
    end

    def small
      image_url(768, 432)
    end

    def medium
      image_url(960, 540)
    end

    def full
      image_url(1920, 1080)
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

    def image_url(width, height)
      url_for variant(width: width, height: height)
    end

    def placeholder_url
      ActionController::Base.helpers.image_path('placeholder')
    end
  end
end
