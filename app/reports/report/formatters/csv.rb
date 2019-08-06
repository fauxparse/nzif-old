require 'csv'

module Report
  module Formatters
    class Csv < Report::Formatter
      def generate
        force_utf8 +
        CSV.generate do |csv|
          csv << labels
          report.each do |row|
            csv << format(row)
          end
        end
      end

      private

      def force_utf8
        "\uFEFF"
      end

      def labels
        report.fields.map(&:label)
      end

      def format(row)
        row.to_a
      end
    end
  end
end
