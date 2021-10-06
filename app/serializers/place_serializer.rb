class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :title, :user_id, :description, :image_url, :location_id, :check_ins, :bucket_list, :artist_name, :verified, :date_uploaded
end
