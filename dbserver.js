const mongoose = require("mongoose");

// Define the MongoDB connection URL
// const mongoURL = "mongodb://0.0.0.0:27017/hotels";

const mongoURL = "mongodb://localhost:27017/hotel"; // Replace 'mydatabase' with your database name

// const mongoURL =
//   "mongodb+srv://virendramajhi03:pOkW5TmCZpLchll5@cluster0.jcle4.mongodb.net/";

// Set up MongoDB connection
mongoose.connect(mongoURL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection .

const db = mongoose.connection;

/// Define event lisetener for database connection

db.on("connected", () => {
  console.log(" MongoDB connection ");
});

db.on("error", (err) => {
  console.log("MongoDB connection error :", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
