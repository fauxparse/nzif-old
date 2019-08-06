module Report
  class Base
    include Enumerable

    attr_reader :festival

    def self.fields
      @fields ||= []
    end

    def self.field(name, options = {}, &block)
      fields << Field.new(name, options, &block)
    end

    def initialize(festival)
      @festival = festival
    end

    def fields
      self.class.fields
    end

    def scope
      raise NotImplementedError, 'please implement #scope'
    end

    def each
      return enum_for(:each) unless block_given?

      scope.in_batches(of: 100).each_record do |record|
        yield Row.new(self, record)
      end
    end
  end
end
