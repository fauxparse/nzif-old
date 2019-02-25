class AttachedImage
  attr_reader :image

  def initialize(image)
    @image = image
  end

  def present?
    image.attached?
  end

  delegate :filename, :variant, to: :image, allow_nil: true
end
