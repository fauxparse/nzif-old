module FontsHelper
  def include_fonts
    content_tag :style, type: 'text/css' do
      <<~STYLES.html_safe
        @font-face {
          font-family: 'Brother';
          src: url(#{font_url('brother.woff2')}) format('woff2'),
            url(#{font_url('brother.woff')}) format('woff');
          font-weight: 700;
          font-style: normal;
        }

        @import url('https://fonts.googleapis.com/css?family=Work+Sans:300,400,600');
      STYLES
    end
  end
end
