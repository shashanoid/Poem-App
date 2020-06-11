class CreateStories < ActiveRecord::Migration[6.0]
  def change
    create_table :stories do |t|
      t.string :title
      t.text :body
      t.belongs_to :user, index: true
      
      t.timestamps null: false
    end
  end
end
