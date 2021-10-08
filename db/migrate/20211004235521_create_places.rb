class CreatePlaces < ActiveRecord::Migration[6.1]
  def change
    create_table :places do |t|

      t.string :title 
      t.integer :user_id
      t.text :description
      t.string :image_url
      t.integer :check_ins 
      t.string :artist_name
      t.boolean :verified
      t.string :date_uploaded 
      t.decimal :lng 
      t.decimal :lat
      t.string :type 


      t.timestamps
    end
  end
end
