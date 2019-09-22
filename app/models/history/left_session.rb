module History
  class LeftSession < Item
    description <<~EOS
      <% if !current_user || current_user == user %>
        <%= user %> left <%= session %>
      <% else %>
        <%= user %> was removed from <%= session %> by <%= current_user %>
      <% end %>
    EOS

    mentions :current_user, required: false
    mentions :user
    mentions :session
  end
end
