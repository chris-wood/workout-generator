json.array!(@routines) do |routine|
  json.extract! routine, :id, :name, :description, :creator
  json.url routine_url(routine, format: :json)
end
