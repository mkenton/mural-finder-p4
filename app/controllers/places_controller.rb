class PlacesController < ApplicationController
    skip_before_action :authorize, only: :index

    def index
        render json: Place.all
    end

    def create
        place = @current_user.places.create!(place_params)
        render json: place, status: :created
    end

    private

    def place_params
        params.permit(:title, :description, :image_url, :artist_name, :lng, :lat)
    end
end
