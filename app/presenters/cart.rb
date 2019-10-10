class Cart
  attr_reader :registration

  def initialize(registration)
    @registration = registration
  end

  def count
    registration.placements_count
  end

  def per_workshop
    Money.new(registration.prices[1])
  end

  def value
    count * per_workshop
  end

  def cost
    Money.new(registration.prices[count])
  end

  def discount
    value - cost
  end

  def payments
    registration.payments
  end

  def paid
    payments.select(&:approved?).sum(&:amount)
  end

  def pending
    payments.select(&:pending?).sum(&:amount)
  end

  def total_to_pay
    Money.new([cost - paid, 0].max)
  end

  def paid?
    total_to_pay <= 0
  end

  def internet_banking_details
    Rails.application.credentials.internet_banking
  end
end
