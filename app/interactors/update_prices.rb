class UpdatePrices < Interaction
  def call
    access_denied! unless can? :update, festival

    update_prices
    festival.save
  end

  delegate :festival, :prices, to: :context

  private

  def update_prices
    festival.prices.each do |price|
      price.mark_for_destruction if price.quantity > prices.length
    end

    prices.each.with_index(1) do |amount, quantity|
      price_for_quantity(quantity).amount_cents = amount
    end
  end

  def price_for_quantity(quantity)
    festival.prices.detect { |p| p.quantity == quantity } ||
      festival.prices.build(activity_type: 'Workshop', quantity: quantity)
  end
end
