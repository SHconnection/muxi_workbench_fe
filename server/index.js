const send = require("koa-send");
const Koa = require("koa");
const Router = require("koa-router");
const userAgent = require("koa-useragent");
const path = require("path");
const swig = require("swig");
const bodyParser = require("koa-bodyparser");
const router = new Router();
const app = new Koa();

const templateRoot = path.join(__dirname, "../build/");

app.use(userAgent);
app.use(bodyParser());

app.use(async (ctx, next) => {
  if (ctx.cookies.get("workbench_token") || /(static|landing)/.test(ctx.path)) {
    await next();
  } else {
    // for production
    ctx.redirect("http://pass.test.com/?landing=team.test.com/landing")
  }
});

router.get(/^\/static(?:\/|$)/, async ctx => {
  const filePath = ctx.path.replace(/static\//, "");
  await send(ctx, filePath, {
    root: path.join(__dirname, "../build")
  });
});

router.get(/^\/(.*)$/, ctx => {
  ctx.cookies.set("landing", ctx.request.query.landing, {
    httpOnly: false
  });
    const template = swig.compileFile(path.resolve(templateRoot, "index.html"));
    ctx.body = template({});
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log("listening on port 3000");