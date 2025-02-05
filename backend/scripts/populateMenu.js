const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Menu = require("../models/MenuItem"); // Adjust this path if needed

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const menuItems = [
  { name: "Burger", price: 10.99, description: "Juicy beef burger with fries." },
  { name: "Pizza", price: 12.99, description: "Cheesy pepperoni pizza." },
  { name: "Pasta", price: 9.99, description: "Spaghetti with marinara sauce." },
  { name: "Salad", price: 7.99, description: "Fresh vegetable salad." },
  { name: "Sushi", price: 15.99, description: "Assorted sushi platter." }
];

const insertMenu = async () => {
  try {
    await Menu.deleteMany(); // Clear previous menu
    await Menu.insertMany(menuItems);
    console.log("✅ Menu inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting menu:", error);
    mongoose.connection.close();
  }
};

insertMenu();
