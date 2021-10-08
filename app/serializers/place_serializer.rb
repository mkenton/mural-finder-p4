class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :title, :user_id, :description, :image_url, :check_ins, :artist_name, :verified, :date_uploaded, :lat, :lng
has_one :user
end
