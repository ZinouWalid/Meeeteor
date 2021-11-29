require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

console.log(new Date().toLocaleDateString().toString());
//test()
MongoClient.connect(process.env.MONGO_CONNECTION_URL, function (err, db) {
  if (err) throw err;
  var myquery = { email: "z@z.com" };
  var dbo = db.db("Meeeteor");
  dbo
    .collection("users")
    .find(myquery)
    .toArray()
    .then((result) => {
      //userType = result[0].isTeacher;
      const link = result[0].isTeacher
        ? "/new-meeting"
        : `/meeeteor_${Math.random().toString(36).substr(2, 10)}`;
      console.log(link);
    });
});
