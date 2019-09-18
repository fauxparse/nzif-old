class StripeCustomer < ApplicationRecord
  belongs_to :user

  validates :user_id, presence: true, uniqueness: true
  validates :customer, presence: true

  def customer
    @customer ||=
      if stripe_customer_id
        Stripe::Customer.retrieve(stripe_customer_id)
      else
        create_stripe_customer.tap do |customer|
          self.stripe_customer_id = customer.id
        end
      end
  end

  private

  def create_stripe_customer
    Stripe::Customer.create({
      email: user.email,
      name: user.name,
      phone: user.phone,
      metadata: {
        user_id: user.to_param,
      },
    })
  end
end
