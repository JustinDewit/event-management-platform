/**
 * This script resets the MongoDB database and populates it with default events.
 *
 * Usage:
 * 1. Ensure you have a .env.local file with MONGODB_URI configured
 * 2. Run: node resetDatabase.js
 */

// Load environment variables
require("dotenv").config({ path: ".env.local" }); // Adjust the path if necessary

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "MONGODB_URI is not defined. Please set it in your .env.local file."
  );
  process.exit(1);
}

async function resetDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);

    // Define the Event schema
    const eventSchema = new mongoose.Schema({
      name: String,
      description: String,
      location: String,
      date: Date,
      time: String,
    });

    const Event = mongoose.model("Event", eventSchema);

    // Delete all existing events
    await Event.deleteMany({});

    // Predefined events
    const events = [
      {
        name: "Jazz in the Park",
        description:
          "An evening of smooth jazz featuring local musicians. Bring your blankets and picnic baskets!",
        location: "Central Park Amphitheater",
        date: new Date("2024-06-15"),
        time: "6:30 PM",
      },
      {
        name: "Tech Startup Networking Mixer",
        description:
          "Connect with fellow entrepreneurs and investors over craft cocktails. Special guest speaker from Silicon Valley.",
        location: "Innovation Hub Downtown",
        date: new Date("2024-06-20"),
        time: "7:00 PM",
      },
      {
        name: "Urban Photography Workshop",
        description:
          "Learn street photography techniques from award-winning photographer Sarah Chen. All skill levels welcome.",
        location: "City Arts Center",
        date: new Date("2024-06-25"),
        time: "10:00 AM",
      },
      {
        name: "Farm-to-Table Cooking Class",
        description:
          "Join Chef Michael Torres for a hands-on cooking experience using seasonal ingredients from local farms.",
        location: "Culinary Institute",
        date: new Date("2024-06-30"),
        time: "2:00 PM",
      },
    ];

    // Insert predefined events into the database
    await Event.insertMany(events);

    console.log("Database has been reset and populated with default events.");
    process.exit();
  } catch (error) {
    console.error("Error resetting database:", error);
    process.exit(1);
  }
}

resetDatabase();
