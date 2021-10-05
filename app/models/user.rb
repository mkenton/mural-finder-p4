class User < ApplicationRecord
    has_secure_password

    # # VALIDATE USERNAME FOR UNIQUENESS 
    # validates :username, uniqueness: {case_sensitive: false}
    # # should include following on user controller if used:  
    # # # rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity 
 

    has_many :places
    has_many :locations, through: :places 
end
