const Router = require("koa-router");
const router = new Router();
const feeds = require("./feeds");
const users = require("./users");

router.use("/feeds", feeds);
router.use("/users", users);

module.exports = router.routes();
