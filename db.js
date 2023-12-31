const mongoose = require("mongoose");
require("dotenv").config();

const mongoDBUri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_DATABASE}.rqnyzcx.mongodb.net/`;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoDBUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
