class UpdateUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :karma, :integer, default: 1
    add_column :users, :about, :text, default: ""
    add_column :users, :admin, :boolean, default: false
  end
end
