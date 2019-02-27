module Types
  class Image < Types::BaseObject
    field :name, String, null: false
    field :thumbnail, String, null: false
    field :small, String, null: false
    field :medium, String, null: false
    field :full, String, null: false
    field :original, String, null: false

    def name
      object.filename
    end

    def thumbnail
      raise NotImplementedError
    end

    def small
      raise NotImplementedError
    end

    def medium
      raise NotImplementedError
    end

    def full
      original
    end

    def original
      url_for(object.image)
    end

    private

    def variant(width:, height:)
      object.variant(
        combine_options: {
          resize: "#{width}x#{height}^",
          extent: "#{width}x#{height}",
          gravity: 'center',
        }
      )
    end

    def image_url(width, height)
      url_for variant(width: width, height: height)
    end
  end
end
