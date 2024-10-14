const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "absax-session",
    keys: ["ABSAX_COOKIE_SECRET"], 
    httpOnly: true,
  })
);

const db = require("./models");
db.sequelize.sync();

require('./routes/auth.routes')(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ATS application." });
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});