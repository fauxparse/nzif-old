class Cart
  attr_reader :registration

  def initialize(registration)
    @registration = registration
  end

  def cost
    Money.new(registration.prices[registration.placements.count])
  end

  def paid
    registration.payments.select(&:approved?).sum(&:amount)
  end

  def pending
    registration.payments.select(&:pending?).sum(&:amount)
  end

  def total_to_pay
    cost - paid
  end
end
