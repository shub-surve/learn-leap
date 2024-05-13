const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://learnnleap:bbpZTDhFplKUIfit@learnnleap.q46sad3.mongodb.net/?retryWrites=true&w=majority&appName=LearnNLeap";
const client = new MongoClient(uri);

async function dbConnect() {
  try {
    await client.connect();
    await client.db("learnnleap").command({ ping: 1 });

    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

module.exports = dbConnect;