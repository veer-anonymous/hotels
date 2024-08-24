const mongoose = require("mongoose");

// Define  Schema of Menu

const menuSchemaItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    requred: true,
  },
  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

const MenuItems = mongoose.model("MenuItems", menuSchemaItem);
module.exports = MenuItems;
