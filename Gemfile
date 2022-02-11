source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.6'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '6.0.3.6'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 4.3'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 6.0.0.beta3'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0.7'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', github: 'rails/jbuilder'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem 'haml', github: 'haml/haml'
gem 'haml-rails', github: 'indirect/haml-rails'
gem 'redcarpet'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Compiles an SVG sprite sheet
gem 'scavenger', github: 'fauxparse/scavenger', branch: 'ignore_meta_files'

# GraphQL
gem 'goldiloader', '>= 3.1.1'
gem 'graphql'
gem 'graphql-batch'

# Image manipulation
gem 'aws-sdk-s3', require: false
gem 'mini_magick'

# Sluggable models
gem 'auto_strip_attributes'
gem 'stringex'
gem 'hashid-rails', github: 'fauxparse/hashid-rails', branch: 'encode_nil_id_as_nil'

# Service objects
gem 'interactor-rails', github: 'fauxparse/interactor-rails', branch: 'rails6'

# Authentication
gem 'omniauth'
gem 'omniauth-rails_csrf_protection'
gem 'omniauth-facebook'
gem 'omniauth-google-oauth2'
gem 'omniauth-twitter'

# Authorization
gem 'access-granted'

# Venues and maps
gem 'geocoder'
gem 'geokit-rails'

# Countries
gem 'countries'

# Pitches
gem 'hashie'
gem 'to_bool'

# Workshop allocation
gem 'matchy_matchy'

# Emails
gem 'premailer-rails'

# Static content
gem 'paper_trail'

# Reporting
gem 'axlsx', '~> 2.0.1', git: 'https://github.com/semaperepelitsa/axlsx', branch: '2.0-rubyzip'
gem 'rubyzip', '>= 1.2.2'

# Payments
gem 'money-rails'
gem 'stripe-rails'

# Calendar integration
gem 'icalendar'

# Full-text search
gem 'pg_search'

gem 'jwt'

gem 'acts_as_list'

gem 'airbrake'
gem 'bugsnag'
gem 'colorize'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  gem 'rspec-rails'
  gem 'rspec-collection_matchers'

  gem 'factory_bot_rails'

  gem 'rubocop', '~> 0.62'
  gem 'rubocop-airbnb', github: 'mcamara/ruby'
  gem 'rubocop-rspec'

  gem 'growl', require: false
  gem 'guard', require: false
  gem 'guard-eslint', github: 'fauxparse/guard-eslint', branch: 'check-empty-paths'
  gem 'guard-rspec', require: false
  gem 'guard-rubocop', require: false

  gem 'parallel_tests'

  gem 'webmock'

  gem 'dotenv-rails'

  gem 'bullet'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'letter_opener'
  gem 'graphiql-rails'
  gem 'pry-rails', '~> 0.3.9'
end

group :test do
  gem 'email_spec'
  gem 'rspec-its'
  gem 'shoulda-matchers', '4.0.1'
  gem 'simplecov', require: false
  gem 'stripe-ruby-mock',
    require: false,
    github: 'fauxparse/stripe-ruby-mock',
    branch: 'support_checkout_sessions'
  gem 'stub_env', require: false
  gem 'timecop', require: false
end
