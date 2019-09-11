module Report
  class Field
    attr_reader :name
    attr_reader :options
    attr_reader :block

    def initialize(name, options = {}, &block)
      @name = name.to_sym
      @options = options
      @block = block
    end

    def fetch(row)
      if block
        block.call(row)
      else
        row.send(:name)
      end
    end

    def label
      options[:label] || name.to_s.humanize
    end
  end
end
