class CreateExercises < ActiveRecord::Migration
  def change
    create_table :exercises do |t|
      t.integer :exercise_id
      t.string :name
      t.string :description
      t.string :gif_url
      t.string :video_url
      t.integer :default_reps

      t.timestamps null: false
    end
  end
end
