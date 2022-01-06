const {
  save,
  getAll,
  getById,
  deleteById,
  updateById,
} = require("../db/users.dao");

const createUser = async (data) => {
  return await save(data);
};

const getUsers = async () => {
  return await getAll();
};

const getUserById = async (id) => {
  return await getById(id);
};

const updateUser = async (id, data) => {
  return await updateById(id, data);
};

const deleteUser = async (id) => {
  return deleteById(id);
};

module.exports = { createUser, getUserById, getUsers, updateUser, deleteUser };
