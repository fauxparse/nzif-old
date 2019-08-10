module Types
  class ActivityImage < Types::Image
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
  end
end
