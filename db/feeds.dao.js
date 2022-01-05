const feeds = require("./index").db("facebook").collection("feeds");

const ObjectId = require("mongodb").ObjectId;

const save = async (data) => {
  const result = await feeds.insertOne(data);
  return result;
};

const getAll = async () => {
  const cursor = await feeds.find();
  return cursor.toArray();
};

const getById = async (id) => {
  return await feeds.findOne({ _id: ObjectId(id) });
};

const updateById = async (id, data) => {
  const result = await feeds.replaceOne({ _id: ObjectId(id) }, data);
  return result;
};

const removeById = async (id) => {
  const result = await feeds.deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = { save, getAll, getById, updateById, removeById };
