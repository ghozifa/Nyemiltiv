const express = require("express");
const app = express();
const router = require("./routes/routes");
const session = require("express-session");
const port = process.env.PORT || 3000;


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended:true }));
app.use(session({
    secret: 'projectpp',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true
    }
  }));
app.use(router);
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})