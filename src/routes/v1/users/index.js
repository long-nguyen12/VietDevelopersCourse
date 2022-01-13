const router = require("koa-router")();
const moment = require("moment");
const users = require("../../../db/index").db("facebook").collection("users");
const ObjectId = require("mongodb").ObjectId;
const {
  isJSONObject,
  isSchema,
  isObjectID,
} = require("../../../handler/users.exceptions");
const { response } = require("../../../constants/responses");

router.get("/", async (ctx) => {
  try {
    const cursor = await users.find();
    ctx.body = await cursor.toArray();
  } catch (err) {
    response(ctx, "Server error", 500);
  }
});

router.get("/:id", async (ctx) => {
  const id = ctx.params.id;
  try {
    if (isObjectID(id)) {
      return users.findOne({ _id: ObjectId(id) }).then((user, err) => {
        if (err) {
          response(ctx, err, 400);
        }
        if (user) response(ctx, user, 200);
        else response(ctx, "User is not found", 400);
      });
    } else {
      response(ctx, "ID isn't in correct format", 400);
    }
  } catch (err) {
    response(ctx, "Server error", 500);
  }
});

router.post("/", (ctx) => {
  try {
    let data = ctx.request.body;
    if (isJSONObject(ctx.request.rawBody)) {
      if (isSchema(data)) {
        return users
          .findOne({ username: data.username })
          .then(async (user, err) => {
            if (err) {
              response(ctx, err, 400);
            }
            if (user) {
              response(ctx, "Username already exists", 400);
            } else {
              let res = await users.insertOne({
                ...data,
                birthday: moment(data.birthday).format(),
              });
              response(ctx, res, 200);
            }
          });
      } else {
        response(ctx, "Data is not in correct schema", 400);
      }
    } else {
      response(ctx, "Data is not JSON format", 400);
    }
  } catch (err) {
    response(ctx, "Server error", 500);
  }
});

router.delete("/:id", async (ctx) => {
  try {
    const id = ctx.params.id;
    if (isObjectID(id)) {
      return users.findOne({ _id: ObjectId(id) }).then(async (user, err) => {
        if (err) {
          response(ctx, err, 400);
        }
        if (user) {
          let res = await users.deleteOne({ _id: ObjectId(id) });
          response(ctx, res, 200);
        } else {
          response(ctx, "ID's not exists", 400);
        }
      });
    } else {
      response(ctx, "ID isn't in correct format", 400);
    }
  } catch (error) {
    response(ctx, "Server error", 500);
  }
});

router.put("/:id", async (ctx) => {
  const id = ctx.params.id;
  const data = ctx.request.body;
  try {
    if (isObjectID(id)) {
      if (isJSONObject(ctx.request.rawBody)) {
        if (isSchema(data)) {
          return users
            .findOne({ _id: ObjectId(id) })
            .then(async (user, err) => {
              if (err) {
                response(ctx, err, 400);
              }
              if (user) {
                if (user._id != id) {
                  let res = await users.replaceOne(
                    { _id: ObjectId(id) },
                    {
                      ...data,
                      birthday: moment(data.birthday).format(),
                    }
                  );
                  response(ctx, res, 200);
                }
                response(ctx, "Username already exists", 400);
              } else {
                response(ctx, "ID's not exist", 400);
              }
            });
        } else {
          response(ctx, "Data is not in correct schema", 400);
        }
      } else {
        response(ctx, "Data is not JSON format", 400);
      }
    } else {
      response(ctx, "ID isn't in correct format", 400);
    }
  } catch (error) {
    response(ctx, "Server error", 500);
  }
});

module.exports = router.routes();
