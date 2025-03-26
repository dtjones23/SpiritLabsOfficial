require("dotenv").config();
const mongoose = require("../config/db"); // This imports the already connected mongoose instance
const Cocktail = require("../models/Cocktail");
const fs = require("fs").promises;
const path = require("path");

const seedDatabase = async () => {
  try {
    // Read cocktail data from formula.json
    const data = await fs.readFile(path.join(__dirname, "formula.json"), "utf-8");
    const cocktails = JSON.parse(data);

    console.log("Connected to MongoDB ✅");

    // Clear existing cocktails
    await Cocktail.deleteMany({});
    console.log("Previous cocktail data removed ❌");

    // Insert new cocktails
    await Cocktail.insertMany(cocktails);
    console.log(`${cocktails.length} cocktails seeded successfully! 🍹✅`);

  } catch (error) {
    console.error("Seeding error ❌:", error);
    process.exit(1);
  } finally {
    // await mongoose.connection.close();
    console.log("MongoDB connection closed 🔒");
    process.exit(0);
  }
};

// Run the seeding function
seedDatabase();