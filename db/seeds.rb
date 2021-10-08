# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
puts "clearning out users and places"
User.destroy_all
Place.destroy_all

puts "seeding users 🌱"
alec = User.create(username: "Alec", password: "password", bucket_list: "74,75")
mike = User.create(username: "Mike", password: "password", bucket_list: "76,77")
puts "..."
puts "...seeding Places"
mural1 = Place.create(user_id: 17, artist_name: "Unknown", date_uploaded: "10/5/2021",  check_ins: 5,  title: "Chicago Bridge", image_url: "http://www.chicanoparksandiego.com/gifs/murals/fig65x.jpg", lat: 41.92271616673922, lng: -87.68051147460938)
mural2 = Place.create(user_id: 17, artist_name: "Unknown", date_uploaded: "9/7/2021",   check_ins: 4,  title: "SpiderMan", image_url: "https://i.pinimg.com/474x/38/14/af/3814affa8c571eb5753110a7248e1f62--art-walls-wall-murals.jpg", lat: 41.877690, lng: -87.619884)
mural3 = Place.create(user_id: 17, artist_name: "Unknown", date_uploaded: "10/1/2021", check_ins: 10, title: "Stone Face", image_url: "https://weburbanist.com/wp-content/uploads/2014/02/cut-face-wall-mural-468x467.jpg", lat: 41.9232270610255, lng: -87.7093505859375)
mural4 = Place.create(user_id: 18, artist_name: "Unknown", date_uploaded: "6/17/2021", check_ins: 2,  title: "Colorful Dali", image_url: "https://i.pinimg.com/474x/cb/2c/c1/cb2cc1ebb0d818cd7e79621c27759caa.jpg", lat: 41.90282558841777, lng: -87.72857727050781)
mural5 = Place.create(user_id: 18, artist_name: "Unknown", date_uploaded: "5/7/2021",  check_ins: 1,  title: "Bird Fight", image_url: "https://i.pinimg.com/736x/d6/83/6d/d6836d87339611e6860a54d4e8175712--street-mural-street-art.jpg", lat: 41.88774766944711, lng: -87.63794006347656)
mural5 = Place.create(user_id: 18, artist_name: "Banksy", date_uploaded: "7/7/2021",  check_ins: 85,  title: "There Is Always Hope", image_url: "http://ichef.bbci.co.uk/images/ic/208x208/p027nqt6.jpg", lat: 41.88774766944711, lng: -87.63794006347656)
puts "...done seeding Places"
puts "done seeding! 🚀"