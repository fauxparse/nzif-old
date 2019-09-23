module History
  class CompletedRegistration < Item
    description <<~EOS
      <%= user %> completed registration for <%= festival %>
    EOS

    mentions :user
    mentions :festival
  end
end
