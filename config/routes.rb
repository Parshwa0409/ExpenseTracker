Rails.application.routes.draw do

  root  "categories#index"

  resources :categories

  # get    "/categories", to: "category#index"
  # get    "/categories/new", to: "category#new", as: :new_category
  # post   "/categories", to: "category#create"
  # get "/categories/:id", to: "category#show", as: :category
  # get    "/categories/:id/edit", to: "category#edit", as: :edit_category
  # patch  "/categories/:id", to: "category#update"
  # delete "/categories/:id", to: "category#destroy"


  get "up" => "rails/health#show", as: :rails_health_check

end
