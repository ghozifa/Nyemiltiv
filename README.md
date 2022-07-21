# Nyemiltiv
Project PP

ENDPOINT
Main:

get."/" -> Home -> Controller.Home (Nampilin semua product (cmn ada nama,stock,detail,buy))

get."/foods" -> Controller.Foods (Nampilin categories 1 + product)

get."/beverages" -> Controller.Beverages (Nampilin categories 2 + product)

get."/products/:id" -> Controller.ProductsDetailById (Nampilin detail product + include category)

get."/profiles/:id" -> Controller.ProfilesByUserId (nampilin description profile + createprofile dibawah)

post."/profiles/:id" -> Controller.ProfilesByUserIdPost (nampilin description profile + createprofile dibawah)

Login/Logout:

"/login" -> Login -> Controller.Login

"/logout" -> Logout -> Controller.Logout