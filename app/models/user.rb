class User < ApplicationRecord
    has_secure_password

    # VALIDATE USERNAME FOR UNIQUENESS 
    validates :username, uniqueness: {case_sensitive: false} , presence: true

    has_many :places
end
