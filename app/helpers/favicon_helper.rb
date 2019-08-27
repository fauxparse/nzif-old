module FaviconHelper
  class Favicon
    def self.sizes
      @sizes ||=
        Dir.glob(favicon_directory)
          .map { |f| File.basename(f, '.png').split('-').last.to_i }
          .sort
    end

    def self.favicon_directory
      Rails.root.join('app/assets/images/favicon-*')
    end
  end

  def favicons
    capture do
      Favicon.sizes.each do |size|
        concat(
          tag(
            :link,
            href: asset_path("favicon-#{size}.png"),
            rel: 'icon',
            type: 'image/png',
            sizes: "#{size}x#{size}"
          )
        )
      end
    end
  end
end
