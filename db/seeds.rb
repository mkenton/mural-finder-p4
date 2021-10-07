# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
puts "clearning out users and places"
User.destroy_all
Place.destroy_all

puts "seeding data 🌱"
alec = User.create(username: "Alec", password: "password", bucket_list: "[1, 2]")
mike = User.create(username: "Mike", password: "password", bucket_list: "[2, 4]")
puts "..."
mural1 = Place.create(user_id: 5, title: "Cool Mural", image_url: "https://cdn.booooooom.com/wp-content/uploads/2020/02/alexpardee-PowWowMuralPhoto1.jpg", lat: 41.92271616673922, lng: -87.68051147460938)
mural2 = Place.create(user_id: 5, title: "Fireman", image_url: "https://theholmesteadhome.files.wordpress.com/2019/06/p5291604.jpg", lat: 41.92271616673922, lng: -87.68051147460938)
mural3 = Place.create(user_id: 6, title: "People", image_url: "https://milwaukeenns.org/wp-content/uploads/2019/10/dsc02688_48904280961_o.jpg", lat: 41.9232270610255, lng: -87.7093505859375)
mural4 = Place.create(user_id: 6, title: "CameraGuy", image_url: "https://oaklandnorth.net/wp-content/uploads/2012/04/MURAL1.jpg", lat: 41.90282558841777, lng: -87.72857727050781)
mural5 = Place.create(user_id: 6, title: "DontEvenAsk", image_url: "https://hiddencityphila.org/wp-content/uploads/2015/01/9thstreetmural-2013-conradbenner.jpg", lat: 41.88774766944711, lng: -87.63794006347656)
puts 
puts "done seeding! 🚀"