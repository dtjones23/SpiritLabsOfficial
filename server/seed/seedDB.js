const mongoose = require('mongoose');
const { Cocktail } = require('../models');
const formula = require('./formula.json');
const cleanDB = require('./cleanDB');
const { connectDB } = require('../config/connection');

async function seedDatabase() {
  try {
    // Connect to the database
    const dbConnection = await connectDB();
    
    // Clean the existing data
    await cleanDB('Cocktail', 'cocktails');
    
    // Insert new data
    await Cocktail.insertMany(formula);
    
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();