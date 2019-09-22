module History
  class WaitlistFilled < Item
    description <<~EOS
      <%= user %> was added to <%= session %> from the waitlist
    EOS

    mentions :user
    mentions :session
  end
end
