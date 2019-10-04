module Report
  class Base
    include Enumerable

    attr_reader :festival
    attr_reader :options

    def self.fields
      @fields ||= []
    end

    def self.field(name, options = {}, &block)
      fields << Field.new(name, options, &block)
    end

    def initialize(festival, options = {})
      @festival = festival
      @options = options
    end

    def name
      options[:name] || scope.name.humanize.pluralize
    end

    def fields
      self.class.fields
    end

    def scope
      raise NotImplementedError, 'please implement #scope'
    end

    def each
      return enum_for(:each) unless block_given?

      scope.each do |record|
        yield Row.new(self, record)
      end
    end
  end
end
