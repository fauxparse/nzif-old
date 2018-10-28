Rails.application.routes.draw do
  get '*path' => 'festivals#show'
  root to: 'festivals#show'
end
