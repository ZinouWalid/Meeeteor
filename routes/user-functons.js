async function insertUser(doc) {
  const MongoClient = require("mongodb").MongoClient;
  // Replace the uri string with your MongoDB deployment's connection string.
 
  const client = new MongoClient(process.env.MONGO_CONNECTION_URL);
  const Meeeteor = client.db("Meeeteor");
  const User = Meeeteor.collection("User");

  //User.createIndex({ matricule: 1 }, { unique: true });
  try {
    await client.connect();

    // create a document to insert

    const result = await User.insertOne(doc);

    console.log(`A User was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

async function deleteUser(query) {
  const MongoClient = require("mongodb").MongoClient;
  // Replace the uri string with your MongoDB deployment's connection string.
  const uri =
    "mongodb+srv://zineddine_walid:mongodb1209@cluster0.o2k2b.mongodb.net/Meeeteor?retryWrites=true&w=majority";

  const client = new MongoClient(process.env.MONGO_CONNECTION_URL);
  const Meeeteor = client.db("Meeeteor");
  const User = Meeeteor.collection("User");

  try {
    await client.connect();

    // Query for a User that has matricule 191931047539

    const result = await User.deleteOne(query);

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one User.");
    } else {
      console.log("No User matched the query. Deleted 0 User.");
    }
  } finally {
    await client.close();
  }
}

async function findUser(query) {
  const MongoClient = require("mongodb").MongoClient;
  // Replace the uri string with your MongoDB deployment's connection string.
  
  const client = new MongoClient(process.env.MONGO_CONNECTION_URL);
  const Meeeteor = client.db("Meeeteor");
  const User = Meeeteor.collection("User");

  try {
    await client.connect();

    // Query for a User that has matricule 191931047539

    const resultCount = await User.find(query).count();
    const result = await User.findOne(query);

    if (resultCount) {
      console.log(`A User was found`);
      return result;
    }
  } finally {
    await client.close();
  }
}

module.exports = { insertUser, deleteUser, findUser };
