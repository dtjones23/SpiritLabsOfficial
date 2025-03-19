require("dotenv").config();
const mongoose = require("../config/db");
const Cocktail = require("../models/Cocktail");
const fs = require("fs");

// Read cocktail data from formula.json
const cocktails = JSON.parse(fs.readFileSync(__dirname + "/formula.json", "utf-8"));

// Seed function
const seedDatabase = async () => {
  try {
    await mongoose.connection.once("open", async () => {
      console.log("Connected to MongoDB ✅");

      // Clear existing cocktails
      await Cocktail.deleteMany({});
      console.log("Previous cocktail data removed ❌");

      // Insert new cocktails
      await Cocktail.insertMany(cocktails);
      console.log("New cocktail data seeded! 🍹✅");

      mongoose.connection.close();
    });
  } catch (error) {
    console.error("Seeding error ❌:", error);
    mongoose.connection.close();
  }
};

// Run the seeding function
seedDatabase();
