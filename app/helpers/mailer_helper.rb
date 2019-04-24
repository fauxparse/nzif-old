module MailerHelper
  def email_section(options = {}, &block)
    render(layout: '/mailer/section', locals: options, &block)
  end

  def inline_image(image, **options)
    attachments.inline[image] = File.read(Rails.root.join('app/assets/images', image))
    image_tag attachments.inline[image].url, **options
  end
end
