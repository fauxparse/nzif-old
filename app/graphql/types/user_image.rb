module Types
  class UserImage < Types::Image
    def thumbnail
      image_url(128, 128)
    end

    def small
      image_url(48, 48)
    end

    def medium
      image_url(96, 96)
    end

    def full
      image_url(192, 192)
    end
  end
end
