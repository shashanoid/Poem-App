module V1
  class CommentsController < ApplicationController
    skip_before_action :authenticate_user_from_token, only: [:create]
    before_action :set_comment

    

    def new
      @comment = Comment.new
    end

    # POST /v1/stories
    # Add a new story
    def create
      @comment
      if params[:comment][:reply] == "true"
        parent = Comment.find(params[:comment][:parent_id])
        @comment = parent.children.build(comment_params)
        @comment.user_id = current_user.id
      else
        @comment = current_user.comments.build(comment_params)
      end

      byebug
      if @comment.save
        render json: @comment
      else
        render json: {error: t('Unabel to save comment')}, status: :unprocessable_entity
      end
    end


    def get_popular_comments
      Comment.select("comments.*, (((commennts.votes_count) / POW(((EXTRACT(EPOCH FROM (now()-comments.created_at)) / 3600)::integer + 2), 1.5))) AS popularity").order("popularity DESC")
    end

    private

    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:parent_id, :text, :post_id)
    end

  end
end