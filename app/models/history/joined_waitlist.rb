module History
  class JoinedWaitlist < Item
    description <<~EOS
      <% if !current_user || current_user == user %>
        <%= user %> joined the waitlist for <%= session %>
      <% else %>
        <%= user %> was added to the waitlist for <%= session %> by <%= current_user %>
      <% end %>
    EOS

    mentions :current_user, required: false
    mentions :user
    mentions :session

    def icon
      'join-waitlist'
    end
  end
end
