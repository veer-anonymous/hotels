const express = require("express");
const app = express();
const db = require("./dbserver");
const bodyParser = require("body-parser"); // body pass middleware automatic convert data from data

app.use(bodyParser.json()); // Convert to any for data from user and save to req.body
app.get("/", (req, res) => {
  res.send("welcome to home page");
});

// Import the router files

const personRoutes = require("./routes/personRoutes");
const menuitemRoutes = require("./routes/menuRoutes");
app.use("/person", personRoutes);
app.use("/menu", menuitemRoutes);

app.listen(7000, () => {
  console.log("port run in the server", 7000);
});
