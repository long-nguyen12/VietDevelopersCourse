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
    by: Joi.string()
      .alphanum()
      .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
      .required(),
    type: Joi.object({
      name: Joi.string().required(),
      isTopStory: Joi.boolean().required(),
    }),
    content: Joi.object({
      description: Joi.string().required(),
      photos: Joi.array().items(
        Joi.object({
          id: Joi.string().alphanum().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
          url: Joi.string().pattern(
            new RegExp(
              "(http(s)?://.)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}(.[a-z]{2})?"
            )
          ),
        })
      ),
    }),
  });
  return schema.validate(data).hasOwnProperty("error") ? false : true;
};

module.exports = {
  isJSONObject,
  isObjectID,
  isSchema,
};
