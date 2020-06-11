class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  after_create :update_access_token! 

  validates :username, presence: true
  validates :email, presence: true

  has_many :stories, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :votes, dependent: :destroy


  private

  def update_access_token!
    self.access_token = "#{self.id}:#{Devise.friendly_token}"
    save
  end

end
