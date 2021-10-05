class User < ApplicationRecord
    has_secure_password

    has_many :places
    has_many :locations, through: :places 
end
