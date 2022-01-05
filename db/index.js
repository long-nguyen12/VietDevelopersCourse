const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://admin:admin@cluster0.pa3x2.mongodb.net/social?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.log(err);
    client.close();
    process.exit(-1);
  }
  console.log("Successfully connect to MongoDB");
});

module.exports = client;
