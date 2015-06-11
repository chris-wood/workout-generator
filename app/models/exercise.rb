class Exercise < ActiveRecord::Base

	has_one :routine, :through => :routine_exercises

end
