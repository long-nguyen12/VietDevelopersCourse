const router = require("koa-router")();

const {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} = require("../../../apis/users.api");

router.get("/", async (ctx) => {
  try {
    ctx.response.status = 200;
    ctx.body = await getUsers();
  } catch (err) {
    ctx.response.status = 400;
  }
});

router.get("/:id", async (ctx) => {
  try {
    const id = ctx.params.id;
    ctx.response.status = 200;
    ctx.body = await getUserById(id);
  } catch (err) {
    ctx.response.status = 400;
  }
});

router.post("/", async (ctx) => {
  try {
    ctx.response.status = 200;
    let user = ctx.request.body;
    user = await createUser(user);
    ctx.body = user;
  } catch (err) {
    ctx.response.status = 400;
  }
});

router.delete("/:id", async (ctx) => {
  try {
    const id = ctx.params.id;
    ctx.response.status = 200;
    ctx.body = await deleteUser(id);
  } catch (err) {
    ctx.response.status = 400;
  }
});

router.put("/:id", async (ctx) => {
  try {
    const id = ctx.params.id;
    let user = ctx.request.body;
    user = await updateUser(id, user);
    ctx.response.status = 200;
    ctx.body = user;
  } catch (err) {
    ctx.response.status = 400;
  }
});

module.exports = router.routes();
