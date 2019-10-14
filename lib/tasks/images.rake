namespace :images do
  desc 'convert images to JPG'
  task convert: :environment do
    include Rails.application.routes.url_helpers

    models = [User]
    models.each do |model|
      model.all.each do |record|
        next unless record.image.attached?

        image = MiniMagick::Image.open(url_for(record.image))
        image.format 'jpeg'
        record.image.attach(io: File.open(image.path), filename: File.basename(image.path), content_type: 'image/jpeg')
      end
    end
  end
end
