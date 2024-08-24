const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// Paramettrised API calls
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Problem" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data
    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);
    // newPerson.name = data.name;
    const savePerson = await newPerson.save();
    console.log("data saved");
    res.status(200).json(savePerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Inenal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data showing ");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal problem" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter

    const updatedPersonData = req.body; // personalId convert json to object in body ( Updated date for the person )

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
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

router.delete("/id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the  person's ID from the URL paramter

    // Assuming your have a Person Modle

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data update ");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid server" });
  }
});

module.exports = router;
