class AddImageToStory < ActiveRecord::Migration[6.0]
  def change
    add_column :stories, :image, :string
  end
end
