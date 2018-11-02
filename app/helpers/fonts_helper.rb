module FontsHelper
  FONTS = %w(Brother Blokk).freeze
  WORK_SANS = "@import url('https://fonts.googleapis.com/css?family=Work+Sans:300,400,600');"

  def include_fonts
    content_tag :style, type: 'text/css' do
      FONTS.each do |font|
        concat <<~STYLES.html_safe
          @font-face {
            font-family: '#{font}';
            src: url(#{font_url("#{font.underscore}.woff2")}) format('woff2'),
                  url(#{font_url("#{font.underscore}.woff")}) format('woff');
            font-weight: 700;
            font-style: normal;
          }
        STYLES
      end

      concat WORK_SANS.html_safe
    end
  end
end
