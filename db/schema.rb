# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_03_19_032422) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

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
    t.string "uid", limit: 64
    t.index ["type", "uid"], name: "index_identities_on_type_and_uid", unique: true
    t.index ["user_id"], name: "index_identities_on_user_id"
  end

  create_table "pitches", force: :cascade do |t|
    t.bigint "festival_id"
    t.bigint "user_id"
    t.string "state", default: "draft", null: false
    t.text "data", default: "{}", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["festival_id", "user_id", "state"], name: "index_pitches_on_festival_id_and_user_id_and_state"
    t.index ["festival_id"], name: "index_pitches_on_festival_id"
    t.index ["user_id"], name: "index_pitches_on_user_id"
  end

  create_table "presenters", force: :cascade do |t|
    t.bigint "activity_id"
    t.bigint "user_id"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_id"], name: "index_presenters_on_activity_id"
    t.index ["user_id"], name: "index_presenters_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "activity_id"
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "venue_id"
    t.index ["activity_id"], name: "index_sessions_on_activity_id"
    t.index ["starts_at", "ends_at"], name: "index_sessions_on_starts_at_and_ends_at"
    t.index ["venue_id"], name: "index_sessions_on_venue_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "authorised_roles", default: [], array: true
    t.string "city"
    t.string "country_code", limit: 4
    t.text "bio"
    t.index "lower((email)::text)", name: "index_users_on_lowercase_email", unique: true
  end

  create_table "venues", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.decimal "latitude", precision: 15, scale: 10
    t.decimal "longitude", precision: 15, scale: 10
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["latitude", "longitude"], name: "index_venues_on_latitude_and_longitude"
  end

  add_foreign_key "activities", "festivals", on_delete: :cascade
  add_foreign_key "identities", "users", on_delete: :cascade
  add_foreign_key "pitches", "festivals", on_delete: :cascade
  add_foreign_key "pitches", "users", on_delete: :cascade
  add_foreign_key "presenters", "activities"
  add_foreign_key "presenters", "users"
  add_foreign_key "sessions", "activities", on_delete: :cascade
  add_foreign_key "sessions", "venues", on_delete: :cascade
end
