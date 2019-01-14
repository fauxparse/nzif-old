# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_01_14_082501) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.bigint "festival_id"
    t.string "type"
    t.string "name"
    t.string "slug"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "experience_levels", default: [], array: true
    t.index ["festival_id", "type", "slug"], name: "index_activities_on_festival_id_and_type_and_slug"
    t.index ["festival_id"], name: "index_activities_on_festival_id"
  end

  create_table "festivals", force: :cascade do |t|
    t.date "start_date"
    t.date "end_date"
    t.index "date_part('year'::text, start_date)", name: "festivals_by_year", unique: true
  end

  create_table "identities", force: :cascade do |t|
    t.bigint "user_id"
    t.string "type"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_identities_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "activity_id"
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_id"], name: "index_sessions_on_activity_id"
    t.index ["starts_at", "ends_at"], name: "index_sessions_on_starts_at_and_ends_at"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index "lower((email)::text)", name: "index_users_on_lowercase_email", unique: true
  end

  add_foreign_key "activities", "festivals", on_delete: :cascade
  add_foreign_key "identities", "users", on_delete: :cascade
  add_foreign_key "sessions", "activities", on_delete: :cascade
end
