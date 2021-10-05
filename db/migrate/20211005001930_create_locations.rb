class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations do |t|

      t.integer :longitude 
      t.integer :latitude
      t.string :type 
      

      t.timestamps
    end
  end
end
