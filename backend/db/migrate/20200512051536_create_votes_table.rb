class CreateVotesTable < ActiveRecord::Migration[6.0]
  def change
    create_table "votes", force: :cascade do |t|
      t.integer "voteable_id"
      t.string "voteable_type"
      t.integer "user_id"
      t.datetime "created_at"
      t.datetime "updated_at"
      t.string "vote_type"
      t.index ["user_id"], name: "index_votes_on_user_id"
      t.index ["voteable_id", "voteable_type", "user_id"], name: "index_votes_on_voteable_id_and_voteable_type_and_user_id", unique: true
      t.index ["voteable_id", "voteable_type"], name: "index_votes_on_voteable_id_and_voteable_type"
    end
  end
end
