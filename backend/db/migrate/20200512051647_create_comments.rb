class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table "comments", force: :cascade do |t|
      t.integer "user_id"
      t.text "text"
      t.integer "votes_count", default: 0
      t.datetime "created_at"
      t.datetime "updated_at"
      t.integer "post_id"
      t.integer "parent_id"
      t.index ["post_id"], name: "index_comments_on_post_id"
      t.index ["user_id"], name: "index_comments_on_user_id"
    end
  end
end
