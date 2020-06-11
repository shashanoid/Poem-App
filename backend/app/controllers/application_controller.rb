class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  include AbstractController::Translation

  before_action :authenticate_user_from_token
  respond_to :json

  # Get token from request header
  def authenticate_user_from_token
    auth_token = request.headers['Authorization']
    if auth_token
      authenticate_with_auth_token auth_token
    else
      authentication_error
    end
  end


  private

  def authenticate_with_auth_token auth_token
    unless auth_token.include?(':')
      authentication_error
      return
    end

    user_id = auth_token.split(':').first
    user = User.where(id: user_id).first

    if user && Devise.secure_compare(user.access_token, auth_token)
      # User can access
      sign_in user, store: false
    else
      authentication_error
    end
  end

  # Render 401
  def authentication_error
    action = params[:action]
    unless action == "get_popular_stories"
      # User's token is either invalid or not in the right format
      render json: {error: t('unauthorized')}, status: 401  # Authentication timeout
    end
  end

end
