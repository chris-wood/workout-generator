class CreateRoutines < ActiveRecord::Migration
  def change
    create_table :routines do |t|
      t.integer :routine_id
      t.string :name
      t.string :description
      t.integer :creator

      t.timestamps null: false
    end
  end
end
