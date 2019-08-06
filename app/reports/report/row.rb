module Report
  class Row < SimpleDelegator
    attr_reader :report

    def initialize(report, record)
      @report = report

      super(record)
    end

    def record
      __getobj__
    end

    def to_a
      report.fields.map { |field| field.fetch(self) }
    end
  end
end
