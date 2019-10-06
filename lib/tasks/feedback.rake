namespace :feedback do
  desc 'send feedback requests for sessions that have just finished'
  task request: :environment do
    SendFeedbackRequests.call
  end
end
