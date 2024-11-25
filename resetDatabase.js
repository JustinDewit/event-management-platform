/**
 * This script resets the MongoDB database and populates it with default events.
 *
 * Usage:
 * 1. Ensure you have a .env.local file with MONGODB_URI configured
 * 2. Run: node resetDatabase.js
 */

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "MONGODB_URI is not defined. Please set it in your .env.local file."
  );
  process.exit(1);
}

async function resetDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);

    const eventSchema = new mongoose.Schema({
      name: String,
      description: String,
      detailedDescription: String,
      location: String,
      date: Date,
      time: String,
    });

    const Event = mongoose.model("Event", eventSchema);

    await Event.deleteMany({});

    const events = [
      {
        name: "Jazz in the Park",
        description: "An evening of smooth jazz featuring local musicians.",
        detailedDescription:
          "Join us for a night of jazz under the stars with local bands. Enjoy a relaxing evening with friends and family, surrounded by the beautiful scenery of Central Park. Bring your picnic blankets and enjoy a variety of food trucks offering delicious treats.",
        location: "Central Park Amphitheater",
        date: new Date("2024-06-15"),
        time: "6:30 PM",
      },
      {
        name: "Tech Startup Networking Mixer",
        description:
          "Connect with fellow entrepreneurs and investors over craft cocktails. Special guest speaker from Silicon Valley.",
        detailedDescription:
          "A great opportunity to network with industry leaders and investors. Engage in insightful discussions, share your ideas, and gain valuable feedback. Don't miss the keynote speech by a renowned Silicon Valley entrepreneur, who will share their journey and tips for success.",
        location: "Innovation Hub Downtown",
        date: new Date("2024-06-20"),
        time: "7:00 PM",
      },
      {
        name: "Urban Photography Workshop",
        description:
          "Learn street photography techniques from award-winning photographer Sarah Chen. All skill levels welcome.",
        detailedDescription:
          "A chance to learn from a master and improve your photography skills. Explore the vibrant streets of the city and capture stunning images under the guidance of Sarah Chen. This workshop includes hands-on sessions, critiques, and a final exhibition of your work.",
        location: "City Arts Center",
        date: new Date("2024-06-25"),
        time: "10:00 AM",
      },
      {
        name: "Farm-to-Table Cooking Class",
        description:
          "Join Chef Michael Torres for a hands-on cooking experience using seasonal ingredients from local farms.",
        detailedDescription:
          "A unique opportunity to learn from a renowned chef and enjoy the freshest ingredients. Discover the secrets of farm-to-table cooking, from selecting the best produce to creating exquisite dishes. This class includes a tour of a local farm and a gourmet meal prepared by you.",
        location: "Culinary Institute",
        date: new Date("2024-06-30"),
        time: "2:00 PM",
      },
    ];

    await Event.insertMany(events);

    console.log("Database has been reset and populated with default events.");
    process.exit();
  } catch (error) {
    console.error("Error resetting database:", error);
    process.exit(1);
  }
}

resetDatabase();
