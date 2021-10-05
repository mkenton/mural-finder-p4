class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :password_confirmation
end
