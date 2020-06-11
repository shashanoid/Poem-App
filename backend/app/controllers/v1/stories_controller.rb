module V1
  class StoriesController < ApplicationController
    skip_before_action :authenticate_user_from_token, only: [:index, :show]

    
    # GET /v1/stories
    # Get all the stories
    def index
      @stories = Story.includes(:user).order(created_at: :desc).all
      render json: @stories, each_serializer: StoriesSerializer
    end

    def show
      @story = Story.find(params[:id])
      render json: @story, serializer: StorySerializer
    end

    # POST /v1/stories
    # Add a new story
    def create
      @story = Story.new(story_params)

      if @story.save
        render json: @story, serializer: StorySerializer
      else
        render json: { error: t('story_create_error') }, status: :unprocessable_entity
      end
    end

    # Get all user stories
    def get_user_stories
      @user_stories = current_user.stories

      unless @user_stories == []
        render json: @user_stories, status: 200
        return
      end

      render json: {error: 'No stories yet'}, status: 404
    end


    def destroy
      @story = Story.find_by(id: params[:id])

      if @story
        if @story.destroy
          render json: {message: 'Successfully deleted'}, status: 200
        else
         render json: {error: @story.errors.full_messages}, status: :unprocessable_entity
        end
      else
        render json: {error: 'Story does not exist'}, status: :unprocessable_entity
      end
    end


    def newest
      @stories = Story.order("created_at DESC")
      render json: @stories, root: nil
    end

    # Upvote a story
    def upvote_story
      begin
        current_user.votes.build(:voteable_id => params[:story_id], :voteable_type => "Story", :vote_type => "Up").save!
        render json: {message: 'Upvote successful!'}, status: 200
      rescue StandardError => e
        render json: {error: 'Already upvoted'}, status: :unprocessable_entity
      end
    end

    # Downvote a story
    def downvote_story
      begin
        # Delete user vote
        current_user.votes.find_by(voteable_id: params[:story_id]).delete
        #Update story vote count
        @story = Story.find(params[:story_id])
        @story.update_attribute(:votes_count, @story[:votes_count] - 1)
        @story.save

        render json: {message: 'Downvote successful!'}, status: 200
      rescue StandardError => e
        render json: {error: 'Already downvoted'}, status: :unprocessable_entity
      end
    end

    def get_popular_stories
      @popular_stories = Story.select("stories.*, (((stories.votes_count) / POW(((EXTRACT(EPOCH FROM (now()-stories.created_at)) / 3600)::integer + 2), 1.5))) AS popularity").order("popularity DESC")
      render json: @popular_stories, root: nil
    end

    
    private
    def story_params
      params.require(:story).permit(:title, :body).merge(user: current_user)
    end

  end
end