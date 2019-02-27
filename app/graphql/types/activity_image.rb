module Types
  class ActivityImage < Types::Image
    def name
      object.present? ? super : 'placeholder.jpg'
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
      object.present? ? super : placeholder_url
    end

    private

    def placeholder_url
      ActionController::Base.helpers.image_path('placeholder')
    end

    def image_url(width, height)
      object.present? ? super(width, height) : placeholder_url
    end
  end
end
