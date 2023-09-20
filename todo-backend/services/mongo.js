require("dotenv").config();

const mongoose = require("mongoose");

async function mongoConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    throw error;
  }
}

module.exports = {
  mongoConnect,
};
