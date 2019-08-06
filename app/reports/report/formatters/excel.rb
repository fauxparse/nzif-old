module Report
  module Formatters
    class Excel < Report::Formatter
      def generate
        package = Axlsx::Package.new
        package.workbook.add_worksheet(name: report.name) do |sheet|
          sheet.add_row(labels)
          report.each do |row|
            sheet.add_row format(row)
          end
        end
        package.to_stream
      end

      private

      def labels
        report.fields.map(&:label)
      end

      def format(row)
        row.to_a
      end
    end
  end
end
