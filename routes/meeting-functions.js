require("dotenv").config();

async function insertMeeting(doc) {
  const MongoClient = require("mongodb").MongoClient;
  // Replace the uri string with your MongoDB deployment's connection string.

  const client = new MongoClient(process.env.MONGO_CONNECTION_URL);
  const Meeeteor = client.db("Meeeteor");
  const Meeting = Meeeteor.collection("Meetings");

  //Meeting.createIndex({ matricule: 1 }, { unique: true });
  try {
    await client.connect();

    // create a document to insert

    const result = await Meeting.insertOne(doc);

    console.log(`A Meeting was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

async function deleteMeeting(query) {
  const MongoClient = require("mongodb").MongoClient;
  // Replace the uri string with your MongoDB deployment's connection string.
  const uri = process.env.MONGO_CONNECTION_URL;

  const client = new MongoClient(process.env.MONGO_CONNECTION_URL);
  const Meeeteor = client.db("Meeeteor");
  const Meeting = Meeeteor.collection("Meeting");

  try {
    await client.connect();

    // Query for a Meeting that has matricule 191931047539

    const result = await Meeting.deleteOne(query);

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one Meeting.");
    } else {
      console.log("No Meeting matched the query. Deleted 0 Meeting.");
    }
  } finally {
    await client.close();
  }
}

async function findMeeting(query) {
  const MongoClient = require("mongodb").MongoClient;
  // Replace the uri string with your MongoDB deployment's connection string.

  const client = new MongoClient(process.env.MONGO_CONNECTION_URL);
  const Meeeteor = client.db("Meeeteor");
  const Meeting = Meeeteor.collection("Meeting");

  try {
    await client.connect();

    // Query for a Meeting that has matricule 191931047539

    const resultCount = await Meeting.find(query).count();
    const result = await Meeting.findOne(query);

    if (resultCount) {
      console.log(`A Meeting was found`);
      return result;
    }
  } finally {
    await client.close();
  }
}

module.exports = { insertMeeting, deleteMeeting, findMeeting };
