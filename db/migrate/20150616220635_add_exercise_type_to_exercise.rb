class AddExerciseTypeToExercise < ActiveRecord::Migration
  def change
    add_column :exercises, :exercise_type, :integer
  end
end
