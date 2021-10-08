class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bucket_list, :password, :password_confirmation
end
