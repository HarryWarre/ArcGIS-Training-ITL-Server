"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.bodyParser = exports.commonRouter = void 0);
var check_url_1 = require("./check-url"),
  Router = require("koa-router"),
  _bodyParser = require("koa-bodyparser"),
  router = new Router(),
  info =
    ((exports.commonRouter = router),
    function (r, e) {
      "development" === process.env.NODE_ENV
        ? (r.body = require("../../../../client/jimu-core/version.json"))
        : (r.body = require("../../../version.json"));
    }),
  bodyParserBodyLimit =
    (router.post("/rest/check_url", check_url_1.checkUrl),
    router.get("/rest/info", info),
    router.get("/info", info),
    "50mb"),
  bodyParser = _bodyParser({
    jsonLimit: bodyParserBodyLimit,
    xmlLimit: bodyParserBodyLimit,
    textLimit: bodyParserBodyLimit,
    formLimit: bodyParserBodyLimit,
  });
exports.bodyParser = bodyParser;
