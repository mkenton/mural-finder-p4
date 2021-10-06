# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# User.all.destroy
# Place.all.destroy

alec = User.create(username: "Alec", password: "password")
mike = User.create(username: "Mike", password: "password")


mural1 = Place.create(user_id: 9, title: "Cool Mural", image_url: "https://cdn.booooooom.com/wp-content/uploads/2020/02/alexpardee-PowWowMuralPhoto1.jpg")
mural2 = Place.create(user_id: 10, title: "Fireman", image_url: "https://theholmesteadhome.files.wordpress.com/2019/06/p5291604.jpg")