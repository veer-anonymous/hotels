const express = require("express");
const router = express.Router();
const MenuItems = require("../models/Menu"); // create model and import from model file
const { route } = require("./personRoutes");

router.get("/", async (req, res) => {
  try {
    const data = await MenuItems.find(); // this is NOSQL method to find data from MongoDB
    console.log("find data from the menuitem model");
    res.status(200).json(data); // this is send a response of user which he has want to data
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal problem" }); // if some time you got error from your user
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body; // request  or input data user from client side the store data from req.body
    const newMenu = new MenuItems(data); // this is a create a new data
    const saveMenu = await newMenu.save(); // for save the data from you have created  that data
    console.log("data save");
    res.status(200).json(saveMenu);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Inernal Server Error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    // ["sweet", "spicy", "sour"],
    if (tasteType == "spicy" || tasteType == "sweet" || tasteType == "sour") {
      const response = await MenuItems.find({ taste: tasteType });
      console.log("find the data from user data");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalide server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updateData_from_user = req.body;
    const response = await MenuItems.findByIdAndUpdate(
      menuId,
      updateData_from_user,
      {
        new: true, // Return the updated documents
        runValidators: true, // Run Mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal problem" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const deltedMenu = await MenuItems.findByIdAndDelete(menuId);
    if (!deltedMenu) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data update ");
    res.status(200).json(deltedMenu);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid server" });
  }
});

module.exports = router;
