const express = require("express");
const Sequelize = require("sequelize");
const path = require("path");
const fs = require("fs");
const router = require("router");
const db = require("./models")
const authRoutes = require('./app/routes/auth-routes');
// must run the code for passport
//const passportSetup = require('./config/passport-setup');


//EXPRESS CONFIGURATION
const app = express();


app.get("/", (req, res) => res.send("home"));

const PORT = process.env.PORT || 8080;

// app.listen(PORT, console.log("Server started on port"));

// const db = require(".app/models/post.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

// const routes1 = require("./app/routes/post-apiroutes.js")(app);
// const routes2 = require("./app/routes/htmlRoutes.js")(app);
// const routes3 = require("./app/routes/search-apiroutes.js")(app);

// app.use(routes1);
// app.use(routes2);
// app.use(routes3);
require("./app/routes/post-apiroutes.js")(app);
require("./app/routes/htmlRoutes.js")(app);
require("./app/routes/search-apiroutes.js")(app);


// auth routes
app.use('/auth', authRoutes);



db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});