class PlacesController < ApplicationController
    skip_before_action :authorize, only: :index

    def index
        render json: Place.all
    end

    def create
        place = @current_user.places.create!(place_params)
        render json: place, status: :created
    end

    def update
        place = Place.find_by(id: params[:id])
        place.update!(update_place_params)
        render json: place, status: :ok
    end

    def increment_check_ins
        place = Place.find_by(id: params[:id])
        place.update(check_ins: place.check_ins + 1)
        render json: place
    end

    private

    def update_place_params
        params.permit(:artist_name)
    end

    def place_params
        params.permit(:title, :description, :image_url, :artist_name, :lng, :lat, :check_ins)
    end
end
