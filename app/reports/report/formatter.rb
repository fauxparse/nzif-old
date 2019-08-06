module Report
  class Formatter
    attr_reader :report
    attr_reader :options

    def initialize(report, options = {})
      @report = report
      @options = options
    end

    def generate
      raise NotImplementedError, 'please implement #generate'
    end
  end
end
