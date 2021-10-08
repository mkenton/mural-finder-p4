class User < ApplicationRecord
    has_secure_password

    # VALIDATE USERNAME FOR UNIQUENESS 
    validates :username, uniqueness: {case_sensitive: false} , presence: true

    has_many :places

    # def bucket_list_murals
    #     self.bucket_list
    # end

end
