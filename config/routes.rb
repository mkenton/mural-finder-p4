Rails.application.routes.draw do
  
  resources :places, only: [:index, :create, :update]
  patch "/places/:id/check_in", to: "places#increment_check_ins"
  
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  patch "/users/:id", to: "users#update" 
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
