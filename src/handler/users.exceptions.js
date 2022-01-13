const ObjectId = require("mongodb").ObjectId;
const Joi = require("joi");

const isJSONObject = (item) => {
  item = typeof item !== "string" ? JSON.stringify(item) : item;
  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }
  if (typeof item === "object" && item !== null) {
    return true;
  }
  return false;
};

const isObjectID = (id) => {
  return ObjectId.isValid(id) ? true : false;
};

const isSchema = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(6).max(30).required(),
    fullname: Joi.string().min(3).max(30).required(),
    birthday: Joi.date().required(),
    gender: Joi.boolean().required(),
  });
  return schema.validate(data).hasOwnProperty("error") ? false : true;
};

module.exports = {
  isJSONObject,
  isObjectID,
  isSchema,
};
