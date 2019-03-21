require 'open-uri'

class AttachImageFromUrl < Interaction
  def call
    open(url) do |f|
      subject.image.attach(io: f, filename: filename)
    end
  rescue
    context.fail!
  end

  private

  delegate :subject, :url, to: :context

  def filename
    File.basename(url)
  end
end
