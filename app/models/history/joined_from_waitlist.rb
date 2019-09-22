module History
  class JoinedFromWaitlist < Item
    description <<~EOS
      <%= user %> joined <%= session %> from the waitlist
    EOS

    mentions :user
    mentions :session
  end
end
