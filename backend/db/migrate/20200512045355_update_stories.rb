class UpdateStories < ActiveRecord::Migration[6.0]
  def change
    add_column :stories, :post_type, :string, default: "default"
    add_column :stories, :comments_count, :integer,default: 0
    add_column :stories, :votes_count, :integer, default: 0
  end
end
