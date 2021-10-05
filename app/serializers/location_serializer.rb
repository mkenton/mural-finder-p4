class LocationSerializer < ActiveModel::Serializer
  attributes :id, :longitude, :latitude,:type
end
