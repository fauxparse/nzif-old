module Queries
  module Content
    extend ActiveSupport::Concern

    included do
      field :content, Types::Content, null: false do
        description 'Retrieve a piece of content'
        argument :slug, String, required: true
        argument :timestamp, Types::FractionalTime, required: false
      end

      def content(slug:, timestamp: nil)
        content = ::Content.find_by!(slug: slug)
        content = content.paper_trail.version_at(timestamp) if timestamp.present?
        content
      end
    end
  end
end
