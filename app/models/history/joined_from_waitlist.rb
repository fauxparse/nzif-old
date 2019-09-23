module History
  class JoinedFromWaitlist < Item
    description <<~EOS
      <%= user %> joined <%= session %> from the waitlist
    EOS

    mentions :user
    mentions :session

    def icon
      'join-from-waitlist'
    end
  end
end
