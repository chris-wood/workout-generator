class CreateRoutineExercises < ActiveRecord::Migration
  def change
    create_table :routine_exercises do |t|
      t.integer :exercise_id
      t.integer :routine_id
      t.string :measure
      t.timestamps null: false
    end
  end
end
