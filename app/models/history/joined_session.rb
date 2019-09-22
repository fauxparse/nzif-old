module History
  class JoinedSession < Item
    description <<~EOS
      <% if !current_user || current_user == user %>
        <%= user %> joined <%= session %>
      <% else %>
        <%= user %> was added to <%= session %> by <%= current_user %>
      <% end %>
    EOS

    mentions :current_user, required: false
    mentions :user
    mentions :session
  end
end
