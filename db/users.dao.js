const moment = require("moment");

const users = require("./index").db("facebook").collection("users");

const ObjectId = require("mongodb").ObjectId;

const save = async (data) => {
  return await users.insertOne({
    ...data,
    birthday: moment(data.birthday).format(),
  });
};

const getAll = async () => {
  const cursor = await users.find();
  return cursor.toArray();
};

const getById = async (id) => {
  return await users.findOne({ _id: ObjectId(id) });
};

const deleteById = async (id) => {
  return await users.deleteOne({ _id: ObjectId(id) });
};

const updateById = async (id, data) => {
  return await users.replaceOne(
    { _id: ObjectId(id) },
    {
      ...data,
      birthday: moment(data.birthday).format(),
    }
  );
};

module.exports = { save, getAll, getById, deleteById, updateById };
