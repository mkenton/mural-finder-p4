class CreatePlaces < ActiveRecord::Migration[6.1]
  def change
    create_table :places do |t|

      t.string :title 
      t.integer :user_id
      t.text :description
      t.string :image_url
      t.integer :location_id
      t.integer :check_ins 
      t.boolean :bucket_list 
      t.string :artist_name
      t.boolean :verified
      t.string :date_uploaded 
      t.integer :longitude 
      t.integer :latitude
      t.string :type 
      


      t.timestamps
    end
  end
end
