class SubjectPrefixInterceptor
  def self.delivering_email(message)
    message.subject = "[TEST] #{message.subject}"
  end
end

if ENV['SEND_TEST_EMAILS'].present?
  ActionMailer::Base.register_interceptor(SubjectPrefixInterceptor)
end
