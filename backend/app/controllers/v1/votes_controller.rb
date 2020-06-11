module V1
  class VotesController < ApplicationController
    skip_before_action :authenticate_user_from_token, only: [:create]

    def create
      vote = current_user.votes.build(vote_params).save!
    end 

    private


    def vote_params
      params.require(:vote).permit(:vote_type, :voteable_type, :voteable_id)
    end

  end
end