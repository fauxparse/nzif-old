module PretendEnvironment
  def pretend_environment(environment)
    around do |example|
      old_environment = Rails.env
      Rails.env = environment.to_s
      example.run
      Rails.env = old_environment
    end
  end
end
