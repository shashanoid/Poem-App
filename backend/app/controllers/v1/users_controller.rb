module V1
  class UsersController < ApplicationController
    skip_before_action :authenticate_user_from_token, only: [:create]

    # POST /v1/users
    # Creates an user
    def create
      @user = User.new user_params

      if @user.save
        render json: @user, serializer: V1::SessionSerializer, root: nil
      else
        render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH /v1/users
    # Updates user details
    def update 
      @user = User.find(current_user.id)
      if @user.update_attributes(user_params)
          render json: {message: 'Details updated successfully'}, status: 200
      else
        render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
      end
      
    end

    private

    def user_params
      params.require(:user).permit(:email, :username, :password, :password_confirmation)
    end
  end
end