const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri =
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pa3x2.mongodb.net/social?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    client.close();
    process.exit(-1);
  }
});

module.exports = client;
