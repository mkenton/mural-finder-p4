class Place < ApplicationRecord
    belongs_to :user

    validates :title, presence: true
    validates :image_url, presence: true
end
