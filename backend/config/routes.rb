Rails.application.routes.draw do
  devise_for :users, only: []

  namespace :v1, defaults: {format: :json} do
    resource :login, only: [:create], controller: :sessions
    resources :users, only: [:create]
    resources :stories, only: [:index, :show, :create, :get_popular_stories]
    resources :votes, only: [:create]
    resources :comments, only: [:index, :show, :create]


    #User routes
    patch 'users', to: "users#update"

    # Story routes
    delete 'stories', to: "stories#destroy"
    get 'get_user_stories', to: "stories#get_user_stories"
    post 'upvote_story', to: "stories#upvote_story"
    post 'downvote_story', to: "stories#downvote_story"

    get 'popular_stories', to: "stories#get_popular_stories"
    get 'new_stories', to: "stories#newest"
  end

end
