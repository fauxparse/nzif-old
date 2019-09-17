class PaymentsController < ApplicationController
  def cancel
    authorize! :cancel, payment
    payment.cancelled!
    redirect_to front_end_url("#{payment.registration.festival.year}/register/payment")
  end

  private

  def payment
    @payment ||= Payment.pending.includes(registration: [:user, :festival]).find(params[:id])
  end
end
