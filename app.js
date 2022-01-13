const Koa = require("koa");
const bodyPaser = require("koa-bodyparser");
const routes = require("./src/routes/index");
require("dotenv").config();
const app = new Koa();

app.use(
  bodyPaser({
    jsonLimit: '10mb',
  })
);
app.use(routes);

app.listen(process.env.PORT || 4000);
