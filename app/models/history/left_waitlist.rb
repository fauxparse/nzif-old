module History
  class LeftWaitlist < Item
    description <<~EOS
      <% if !current_user || current_user == user %>
        <%= user %> left the waitlist for <%= session %>
      <% else %>
        <%= user %> was removed from the waitlist for <%= session %> by <%= current_user %>
      <% end %>
    EOS

    mentions :current_user, required: false
    mentions :user
    mentions :session

    def icon
      'leave-waitlist'
    end
  end
end
