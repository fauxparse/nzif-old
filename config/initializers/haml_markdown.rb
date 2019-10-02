require 'redcarpet'

module Haml::Filters
  remove_filter('Markdown')

  module Markdown
    include Haml::Filters::Base

    def render(text)
      markdown.render(text)
    end

    private

    def markdown
      @markdown ||= Redcarpet::Markdown.new(renderer, extensions)
    end

    def renderer
      @renderer ||= Redcarpet::Render::HTML.new(render_options)
    end

    def render_options
      {
        filter_html: true,
        hard_wrap: true,
        no_styles: true,
        prettify: false,
        safe_links_only: true,
        with_toc_data: false,
      }
    end

    def extensions
      {
        autolink: true,
        fenced_code_blocks: false,
        footnotes: false,
        highlight: true,
        no_images: true,
        no_intra_emphasis: true,
        quote: true,
        space_after_headers: false,
        strikethrough: true,
        superscript: true,
        tables: true,
        underline: true,
      }
    end
  end
end
