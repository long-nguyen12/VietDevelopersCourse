const router = require("koa-router")();
const feeds = require("../../../db/index").db("facebook").collection("feeds");
const ObjectId = require("mongodb").ObjectId;
const { response } = require("../../../constants/responses");

const {
  isObjectID,
  isJSONObject,
  isSchema,
} = require("../../../handler/feeds.exceptions");

router.get("/", async (ctx, next) => {
  try {
    const cursor = await feeds.find();
    ctx.body = await cursor.toArray();
  } catch (err) {
    response(ctx, "Server error", 500);
  }
});

router.get("/:id", async (ctx) => {
  try {
    const id = ctx.params.id;
    if (isObjectID(id)) {
      return feeds.findOne({ _id: ObjectId(id) }).then((feed, err) => {
        if (err) {
          response(ctx, err, 400);
        }
        if (feed) response(ctx, feed, 200);
        else response(ctx, "Feed is not found", 400);
      });
    } else {
      response(ctx, "ID's not in correct format");
    }
  } catch (err) {
    response(ctx, "Server error", 500);
  }
});

router.post("/", async (ctx, next) => {
  try {
    let feed = ctx.request.body;
    if (isJSONObject(ctx.request.rawBody)) {
      if (isSchema(feed)) {
        return feeds.insertOne(feed).then((feed) => response(ctx, feed, 200));
      } else {
        response(ctx, "Data is not in correct schema", 400);
      }
    } else {
      response(ctx, "Data is not JSON format", 400);
    }
  } catch (error) {
    response(ctx, "Server error", 500);
  }
});

router.delete("/:id", async (ctx) => {
  try {
    const id = ctx.params.id;
    if (isObjectID(id)) {
      return feeds.findOne({ _id: ObjectId(id) }).then(async (feed, err) => {
        if (err) {
          response(ctx, err, 400);
        }
        if (feed) {
          let res = await feeds.deleteOne({ _id: ObjectId(id) });
          response(ctx, res, 200);
        } else {
          response(ctx, "Feed is not found", 400);
        }
      });
    } else {
      response(ctx, "ID is incorrect format", 400);
    }
  } catch (error) {
    response(ctx, error, 500);
  }
});

router.put("/:id", async (ctx) => {
  try {
    const id = ctx.params.id;
    if (isObjectID(id)) {
      if (isJSONObject(ctx.request.rawBody)) {
        const data = ctx.request.body;
        if (isSchema(data)) {
          return feeds
            .findOne({ _id: ObjectId(id) })
            .then(async (feed, err) => {
              if (err) {
                response(ctx, err, 400);
              }
              if (feed) {
                let res = await feeds.replaceOne({ _id: ObjectId(id) }, data);
                response(ctx, res, 200);
              } else {
                response(ctx, "Feed is not found", 400);
              }
            });
        } else {
          response(ctx, "Data is not in correct schema", 400);
        }
      } else {
        response(ctx, "Data is not JSON format", 400);
      }
    } else {
      response(ctx, "ID is incorrect format", 400);
    }
  } catch (err) {
    response(ctx, err, 500);
  }
});

module.exports = router.routes();
