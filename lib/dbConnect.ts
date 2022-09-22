import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// check the MongoDB URI
async function dbConnect() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }
  if (mongoose.connection.readyState >= 1) {
    // if connection is open return the instance of the databse for cleaner queries
    return mongoose.connection.db;
  }
  return mongoose.connect(MONGODB_URI, {
    dbName: "twitter-clone"
  });
}
export default dbConnect

