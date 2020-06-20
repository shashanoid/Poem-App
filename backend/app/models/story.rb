class Story < ActiveRecord::Base
  belongs_to :user
  has_many :votes, as: :voteable, dependent: :destroy
  mount_uploader :image, ImageUploader
  # has_many :comments, dependent: :destroy

  after_create :add_vote

  # validates :body, presence: true
  # validates :title, presence: true
  # validates :user, presence: true


  def add_vote
    self.user.votes.build(:voteable_id => self.id, :voteable_type => "Story", :vote_type => "Up").save!
  end
    
end