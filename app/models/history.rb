module History
  def self.table_name_prefix
    'history_'
  end

  def self.record(klass, attributes)
    unless suppressing?
      klass.create!(attributes)
    end
  end

  def self.suppress(&block)
    @suppressing ||= 0
    @suppressing += 1
    yield
    @suppressing -= 1
  end

  def self.suppressing?
    @suppressing&.positive?
  end
end
