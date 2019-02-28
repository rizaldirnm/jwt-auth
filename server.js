const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//API SERVER
const users = require("./routes/api/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB CONFIG
const db = require("./config/keys").mongoURI;
//Connect to DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

//PASSPORT CONFIG
app.use(passport.initialize());
require("./config/passport")(passport);

//ROUTE APIs
app.use("/api/users", users);

//SERVER LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runing on PORT: ${PORT}`));
