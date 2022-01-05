const {
  save,
  getAll,
  getById,
  removeById,
  updateById,
} = require("../db/feeds.dao");

const createFeed = async (data) => {
  return await save(data);
};

const getFeeds = async () => {
  return await getAll();
};

const getFeedById = async (id) => {
  return await getById(id);
};

const deleteFeed = async (id) => {
  return await removeById(id);
};

const updateFeed = async (id, data) => {
  console.log(id);
  return await updateById(id, data);
};

module.exports = {
  createFeed,
  getFeeds,
  getFeedById,
  deleteFeed,
  updateFeed,
};
