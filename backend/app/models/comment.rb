class Comment < ActiveRecord::Base
  acts_as_tree
  belongs_to :user
  belongs_to :post, counter_cache: true

  has_many :votes, as: :voteable, dependent: :destroy

  after_create :add_vote
  validates :user, presence: true


  def add_vote
    self.user.votes.build(:voteable_id => self.id, :voteable_type => "Comment", :vote_type => "Up").save!
  end
    
end