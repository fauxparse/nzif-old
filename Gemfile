source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.1'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.2'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0.0.rc3'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem 'foreman'

gem 'haml-rails'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Compiles an SVG sprite sheet
gem 'scavenger', github: 'fauxparse/scavenger', branch: 'ignore_meta_files'

# GraphQL
gem 'goldiloader'
gem 'graphql'
gem 'graphql-batch'

# Image manipulation
gem 'mini_magick'

# Sluggable models
gem 'auto_strip_attributes'
gem 'stringex'
gem 'hashid-rails'

# Service objects
gem 'interactor-rails'

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

gem 'jwt'

gem 'acts_as_list'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  gem 'rspec-rails'
  gem 'rspec-collection_matchers'

  gem 'factory_bot_rails'

  gem 'rubocop', '~> 0.62'
  gem 'rubocop-airbnb', github: 'mcamara/ruby'

  gem 'growl', require: false
  gem 'guard', require: false
  gem 'guard-eslint', github: 'fauxparse/guard-eslint', branch: 'check-empty-paths'
  gem 'guard-rspec', require: false
  gem 'guard-rubocop', require: false

  gem 'parallel_tests'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'graphiql-rails'

  gem 'pry-rails', '~> 0.3.9'
end

group :test do
  gem 'shoulda-matchers', '4.0.0.rc1'
  gem 'simplecov', require: false
  gem 'stub_env', require: false
  gem 'timecop', require: false
end
